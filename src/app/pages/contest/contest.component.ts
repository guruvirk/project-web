import { Component, OnInit, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { Contest } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { ContestService } from '../../services/contest.service';
import { UxService } from '../../services/ux.service';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.css'],
})
export class ContestComponent implements OnInit, OnDestroy {

  id: string;
  roomCode: string;
  contest: Contest;
  isHost: Boolean = false;
  isSubmitted: Boolean = false;
  result: String;
  isImageUploadRequired: Boolean = false;
  isVideoUploadRequired: Boolean = false;
  isCommentRequired: Boolean = false;
  imageUrl: String;
  videoUrl: String;
  comment: string;
  image: File;
  video: File;
  timeOutIDs: any[] = [];

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
    this.setContest()
  }

  ngOnDestroy(): void {
    this.timeOutIDs.forEach(id => clearTimeout(id));
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

  setContest() {
    this.getContest()
    let this_new = this
    this.timeOutIDs.push(
    setTimeout(function () {
      this_new.setContest()
    }, 5000));
  }

  getContest() {
    this.api.get(this.id).subscribe(item => {
      this.contest = item
      if (this.contest.status == "done") {
        this.router.navigate(["home"])
      } else {
        if (!this.contest.status || this.contest.status == "published" || this.contest.status == "draft" || this.contest.status == "cancelled") {
          this.uxService.handleError("Contest Not Found or Not Started Yet")
          this.router.navigate(["home"])
        }
        if (this.auth.currentUser().id == this.contest.host.id) {
          this.isHost = true
        }
        if (this.isHost && this.contest.hostResult) {
          this.isSubmitted = true
        }
        if (!this.isHost && this.contest.guestResult) {
          this.isSubmitted = true
        }
      }
    })
  }

  onImageSelect($event) {
    const files = $event.srcElement.files;
    this.image = files && files.length ? files[0] : null;
  }

  onVideoSelect($event) {
    const files = $event.srcElement.files;
    this.video = files && files.length ? files[0] : null;
  }

  imageUpload() {
    if (!this.image) {
      this.uxService.handleError("Please Select an Image")
    }
    this.api.upload(this.image).subscribe(url => {
      this.uxService.showInfo("Scrrenshot Uploaded")
      this.imageUrl = url
    })
  }

  videoUpload() {
    if (!this.video) {
      this.uxService.handleError("Please Select an Video")
    }
    this.api.upload(this.video).subscribe(url => {
      this.uxService.showInfo("Video Uploaded")
      this.videoUrl = url
    })
  }

  resultSelect($event) {
    if (!$event.value) {
      return
    }
    this.result = $event.value
    if (this.result == "won") {
      this.isImageUploadRequired = true
      this.isCommentRequired = false
      this.isVideoUploadRequired = false
    } else if (this.result == "cancel") {
      this.isImageUploadRequired = false
      this.isCommentRequired = true
      this.isVideoUploadRequired = true
    } else {
      this.isImageUploadRequired = false
      this.isCommentRequired = false
      this.isVideoUploadRequired = false
    }
  }

  isvalid(): Boolean {
    let valid = true
    if (!this.result) {
      this.uxService.handleError("Please Select Any Option")
      valid = false
    }
    if (this.isImageUploadRequired) {
      if (!this.imageUrl) {
        if (this.image) {
          this.uxService.handleError("Please Select an Image")
        } else {
          this.uxService.handleError("Please wait Untill Screenshot Uploads")
        }
        valid = false
      }
    }
    if (this.isVideoUploadRequired) {
      if (!this.videoUrl) {
        this.uxService.handleError("Please wait Untill Video Uploads")
        valid = false
      }
    }
    if (this.isCommentRequired) {
      if (!this.comment) {
        this.uxService.handleError("Please Add Reason of Cancel")
        valid = false
      }
    }
    return valid
  }

  hostSubmit() {
    if (!this.isvalid()) {
      return
    }
    let model
    if (this.result == "won") {
      model = {
        contest: this.contest,
        result: this.result,
        hostImage: this.imageUrl
      }
    } else if (this.result == "cancel") {
      model = {
        contest: this.contest,
        result: this.result,
        hostVideo: this.videoUrl,
        hostCancelReason: this.comment
      }
    } else {
      model = {
        contest: this.contest,
        result: this.result
      }
    }
    this.api.hostResult(model).subscribe(contest => {
      this.uxService.showInfo("Result Submitted Successfully")
      this.contest = contest
      this.getContest()
    })
  }

  guestSubmit() {
    if (!this.isvalid()) {
      return
    }
    let model
    if (this.result == "won") {
      model = {
        contest: this.contest,
        result: this.result,
        guestImage: this.imageUrl
      }
    } else if (this.result == "cancel") {
      model = {
        contest: this.contest,
        result: this.result,
        guestVideo: this.videoUrl,
        guestCancelReason: this.comment
      }
    } else {
      model = {
        contest: this.contest,
        result: this.result
      }
    }
    this.api.guestResult(model).subscribe(contest => {
      this.uxService.showInfo("Result Submitted Successfully")
      this.contest = contest
      this.getContest()
    })
  }

}
