import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompany } from 'app/shared/model/company.model';

@Component({
  selector: 'jhi-user-company',
  templateUrl: './user-company.component.html'
})
export class UserCompanyComponent implements OnInit {
  company: ICompany | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ company }) => {
      this.company = company;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
