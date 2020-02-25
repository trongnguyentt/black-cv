import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReason } from 'app/shared/model/reason.model';

@Component({
  selector: 'jhi-reason-detail',
  templateUrl: './reason-detail.component.html'
})
export class ReasonDetailComponent implements OnInit {
  reason: IReason | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reason }) => {
      this.reason = reason;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
