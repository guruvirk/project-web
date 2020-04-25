import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Contest } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../services/role.service';
import { ContestService } from '../services/contest.service';
import { UxService } from '../services/ux.service';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.css'],
})
export class ContestComponent implements OnInit {

  id: string;
  roomCode: string;
  contest: Contest;
  isHost: Boolean = false

  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: RoleService,
    private api: ContestService,
    private uxService: UxService) {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.id = params.id
      }
    })
  }

  ngOnInit() {
    if (!this.id) {
      this.uxService.handleError("Contest Not Found")
      this.router.navigate(["home"])
    }
    this.getContest()
  }

  setRoomCode() {
    if (!this.roomCode) {
      this.uxService.handleError("Room Code is Required")
      return
    }
    this.api.roomCode(this.roomCode, this.contest).subscribe(contest => {
      this.uxService.showInfo("Room Code Updated Successfully")
      this.contest = contest
    })
  }

  getContest() {
    this.api.get(this.id).subscribe(item => {
      this.contest = item
      if (!this.contest.status || this.contest.status == "published" || this.contest.status == "draft" || this.contest.status == "cancelled") {
        this.uxService.handleError("Contest Not Found or Not Started Yet")
        this.router.navigate(["home"])
      }
      if (this.auth.currentUser().id == this.contest.host.id) {
        this.isHost = true
      }
    })
    let this_new = this
    setTimeout(function () {
      this_new.getContest()
    }, 5000);
  }

}
