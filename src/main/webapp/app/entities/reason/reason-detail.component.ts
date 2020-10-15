import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IReason } from 'app/shared/model/reason.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-reason-detail',
  templateUrl: './reason-detail.component.html'
})
export class ReasonDetailComponent implements OnInit {
  reason?: IReason;

  constructor(protected activatedRoute: ActivatedRoute, public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe(({ reason }) => {
    //   this.reason = reason;
    // });
  }

  previousState(): void {
    window.history.back();
  }

  clear() {
    this.activeModal.dismiss();
  }
}
