import { Component, OnInit } from '@angular/core';
import { Contest } from '../models';
import { ContestService } from '../services/contest.service';
import { RoleService } from '../services/role.service';
import { Router } from '@angular/router';
import { UxService } from '../services/ux.service';

@Component({
  selector: 'app-conflict',
  templateUrl: './conflict.component.html',
  styleUrls: ['./conflict.component.scss']
})
export class ConflictComponent implements OnInit {

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
    this.api.search({ status: "conflict" }).subscribe(items => {
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
    this.api.conflictResult(contest, contest.result).subscribe(() => {
      this.uxService.showInfo("Conflict Resolved Successfully")
      this.getContests()
    })
  }

}
