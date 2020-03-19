import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICV } from 'app/shared/model/cv.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyService } from 'app/entities/company/company.service';
import { ICompany } from 'app/shared/model/company.model';

@Component({
  selector: 'jhi-cv-detail',
  templateUrl: './cv-detail.component.html'
})
export class CVDetailComponent implements OnInit {
  // cV: ICV | null = null;
  cV?: ICV;
  company?: ICompany;
  id!: number;

  constructor(public companyService: CompanyService, public activeModal: NgbActiveModal, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe(({ cV }) => {
    //   this.cV = cV;
    // });
    this.companyService.find(this.id).subscribe(data => {
      this.company = data.body!;
    });
  }

  clear(): void {
    this.activeModal.dismiss();
  }

  previousState(): void {
    window.history.back();
  }
}
