import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contest } from '../models/contest';
import { RoleService } from '../services/role.service';
import { Router } from '@angular/router';
import { UxService } from '../services/ux.service';
import { ContestService } from '../services/contest.service';
import { BidService } from '../services/bid.service';
import { Bid } from '../models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  contests: Contest[]
  mycontests: Contest[]
  mypublished: Contest[]
  amount: Number
  timeOutIDs: any[] = [];

  constructor(private api: ContestService,
    private bidService: BidService,
    private auth: RoleService,
    private router: Router,
    private uxService: UxService) { }

  ngOnInit() {
    this.getData()
    this.getAvalable()
  }

  ngOnDestroy(): void {
    this.timeOutIDs.forEach(id => clearTimeout(id));
  }

  bid(contest: Contest) {
    if (this.auth.currentUser().coins < contest.coins) {
      this.uxService.handleError("Insufficent Balance")
      return
    }
    this.bidService.create(contest).subscribe(() => {
      this.uxService.showInfo("Request Submitted")
      this.getContest()
    })
  }

  getContest() {
    this.api.search({}).subscribe(items => {
      this.contests = []
      items.forEach(item => {
        if (item.bids && item.bids.length) {
          item.applied = this.isApplied(item)
        }
        this.contests.push(item)
      });
    })
  }

  getMy() {
    this.api.search({ my: true, status: ["ongoing", "ready", "cancelRequest", "conflict"] }).subscribe(items => {
      if (!this.mycontests && items.length) {
        this.auth.refreshUser()
      }
      if (this.mycontests && this.mycontests.length != items.length) {
        this.auth.refreshUser()
      }
      this.mycontests = items
    })
  }

  getPublished() {
    this.api.search({ my: true, status: "published" }).subscribe(items => {
      if (this.mypublished && this.mypublished.length && this.mypublished.length == items.length) {
        items.forEach(item => {
          let index = this.mypublished.findIndex(x => x.id === item.id);
          if (index != undefined) {
            if (!this.mypublished[index].bids || !item.bids || this.mypublished[index].bids.length != item.bids.length) {
              this.mypublished[index].bids = item.bids
            }
          }
        })
      } else {
        this.mypublished = items
      }
    })
  }

  isApplied(contest: Contest): Boolean {
    let currentUser = this.auth.currentUser()
    let applied = false
    contest.bids.forEach(bid => {
      if (bid.guest.id && bid.guest.id == currentUser.id) {
        contest.bids = [bid]
        applied = true
      }
    })
    if (!applied)
      contest.bids = []
    return applied
  }

  cancelBid(contest: Contest) {
    if (contest.bids && contest.bids.length) {
      this.bidService.cancel(contest.bids[0].id).subscribe(() => {
        this.uxService.showInfo("Request Cancelled")
        this.getContest()
      })
    }
  }

  cancelContest(contest: Contest) {
    this.api.cancel(contest.id).subscribe(() => {
      this.uxService.showInfo("Contest Cancelled")
      this.getPublished()
    })
  }

  approve(bid: Bid) {
    this.bidService.approve(bid).subscribe(() => {
      this.uxService.showInfo("Approved Succesfully")
      this.getContest()
      this.getMy()
      this.getPublished()
      this.auth.refreshUser()
    })
  }

  play(contest: Contest) {
    this.router.navigate(["contest", contest.id])
  }

  getData() {
    this.getPublished()
    this.getMy()
    let this_new = this
    this.timeOutIDs.push(
      setTimeout(function () {
        this_new.getData()
      }, 7000)
    );
  }

  getAvalable() {
    this.getContest()
    let this_new = this
    this.timeOutIDs.push(
      setTimeout(function () {
        this_new.getAvalable()
      }, 3000)
    );
  }

  create() {
    if (!this.amount) {
      this.uxService.handleError("Amount is Required")
      return
    }
    if (Number(this.amount) > Number(this.auth.currentUser().coins)) {
      this.uxService.handleError("Insufficent Amount")
      return
    }
    this.api.create(this.amount).subscribe(() => {
      this.uxService.showInfo("Contest Created Succesfully")
      this.getPublished()
    })
  }

}
