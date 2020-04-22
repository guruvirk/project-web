import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  id: string

  constructor(private route: ActivatedRoute,
    private router: Router, ) {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.id = params.id
      }
    })
  }

  ngOnInit() {
    if (!this.id) {
      this.router.navigate(["register"])
    }
  }

}
