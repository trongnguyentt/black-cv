import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReasonList } from 'app/shared/model/reason-list.model';

@Component({
  selector: 'jhi-reason-list-detail',
  templateUrl: './reason-list-detail.component.html'
})
export class ReasonListDetailComponent implements OnInit {
  reasonList: IReasonList | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reasonList }) => {
      this.reasonList = reasonList;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
