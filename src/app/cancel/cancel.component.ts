import { Component, OnInit } from '@angular/core';
import { Contest } from '../models';
import { ContestService } from '../services/contest.service';
import { RoleService } from '../services/role.service';
import { Router } from '@angular/router';
import { UxService } from '../services/ux.service';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent implements OnInit {

  contests: Contest[]

  constructor(private api: ContestService,
    private auth: RoleService,
    private router: Router,
    private uxService: UxService) { }

  ngOnInit() {
    this.getData()
  }

  getContests() {
    this.contests = []
    this.api.search({ status: "cancelRequest" }).subscribe(items => {
      this.contests = items
    })
  }

  getData() {
    this.getContests()
    let this_new = this
    setTimeout(function () {
      this_new.getData()
    }, 10000);
  }

  submitResult(contest: Contest) {
    if (!contest.result) {
      this.uxService.handleError("Please Select Result")
      return
    }
    this.api.cancelRequestResult(contest, contest.result).subscribe(() => {
      this.uxService.showInfo("Cancel Request Resolved Successfully")
      this.getContests()
    })
  }

}
