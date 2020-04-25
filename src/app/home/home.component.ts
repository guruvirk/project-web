import { Component, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {

  contests: Contest[]
  mycontests: Contest[]
  mypublished: Contest[]
  amount: Number

  constructor(private api: ContestService,
    private bidService: BidService,
    private auth: RoleService,
    private router: Router,
    private uxService: UxService) { }

  ngOnInit() {
    this.getData()
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
    this.api.search({ my: true, status: ["ongoing", "ready"] }).subscribe(items => {
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
      this.getPublished()
      this.auth.refreshUser()
    })
  }

  play(contest: Contest) {
    this.router.navigate(["contest", contest.id])
  }

  getData() {
    this.getContest()
    this.getPublished()
    let this_new = this
    setTimeout(function () {
      this_new.getData()
    }, 10000);
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
