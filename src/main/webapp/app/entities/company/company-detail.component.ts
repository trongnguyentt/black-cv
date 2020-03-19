import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ICompany } from 'app/shared/model/company.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyService } from 'app/entities/company/company.service';

@Component({
  selector: 'jhi-company-detail',
  templateUrl: './company-detail.component.html'
})
export class CompanyDetailComponent implements OnInit {
  company?: ICompany;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe(({ company }) => {
    //   this.company = company;
    // });
  }

  previousState(): void {
    window.history.back();
  }

  clear(): void {
    this.activeModal.dismiss();
  }

  // sendCV() {
  //   this.router.navigate(['/account/send-cv'], {
  //     queryParams: {
  //       id: this.company!.id
  //     }
  //   });

  // requestResetPassword(): void {
  //   this.activeModal.dismiss('to state requestReset');
  //   this.router.navigate(['/account/reset', 'request']);
  // }
}
