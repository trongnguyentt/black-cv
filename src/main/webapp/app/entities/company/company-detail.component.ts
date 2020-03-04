import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ICompany } from 'app/shared/model/company.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-company-detail',
  templateUrl: './company-detail.component.html'
})
export class CompanyDetailComponent implements OnInit {
  company: ICompany | null = null;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ company }) => {
      this.company = company;
    });
  }

  previousState(): void {
    window.history.back();
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
