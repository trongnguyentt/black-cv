import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICV } from 'app/shared/model/cv.model';
import {FormBuilder} from "@angular/forms";
import {HttpHeaders, HttpResponse} from "@angular/common/http";
import {ICompany} from "app/shared/model/company.model";
import {CompanyService} from "app/entities/company/company.service";

@Component({
  selector: 'jhi-cv-no-result',
  templateUrl: './cv-no-result.component.html'
})
export class CvNoResultlComponent implements OnInit {
  cV: ICV | null = null;
  companies?: ICompany[];
  searchForm = this.fb.group({
    name: ['']
  });
  constructor(protected activatedRoute: ActivatedRoute,private fb: FormBuilder,protected companyService: CompanyService,) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cV }) => {
      this.cV = cV;
    });
  }
  getFormValues() {
    const res = {};
    const name = this.searchForm.get(['name'])!.value.trim();
    if (name) {
      res['name'] = name;
    }
    return res;
  }
  loadAll() {
    this.companyService
      .query({

        ...this.getFormValues()
      })
      .subscribe((res: HttpResponse<ICompany[]>) => this.paginateCompany(res.body!, res.headers));}
  onSearch() {
    this.loadAll();
  }
  protected paginateCompany(data: ICompany[], headers: HttpHeaders) {
    this.companies = data;
  }
  previousState(): void {
    window.history.back();
  }
}
