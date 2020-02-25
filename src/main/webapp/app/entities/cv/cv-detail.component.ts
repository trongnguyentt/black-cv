import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICV } from 'app/shared/model/cv.model';

@Component({
  selector: 'jhi-cv-detail',
  templateUrl: './cv-detail.component.html'
})
export class CVDetailComponent implements OnInit {
  cV: ICV | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cV }) => {
      this.cV = cV;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
