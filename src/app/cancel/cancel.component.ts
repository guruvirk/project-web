import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class CancelComponent implements OnInit, OnDestroy {

  contests: Contest[]
  timeOutIDs: any[] = [];

  constructor(private api: ContestService,
    private auth: RoleService,
    private router: Router,
    private uxService: UxService) { }

  ngOnInit() {
    this.getData()
  }

  ngOnDestroy(): void {
    this.timeOutIDs.forEach(id => clearTimeout(id));
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
    this.timeOutIDs.push(
      setTimeout(function () {
        this_new.getData()
      }, 10000));
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
