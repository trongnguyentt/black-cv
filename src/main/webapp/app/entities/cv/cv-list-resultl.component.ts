import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CV, ICV } from 'app/shared/model/cv.model';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Company, ICompany } from 'app/shared/model/company.model';
import { CompanyService } from 'app/entities/company/company.service';

import { CVService } from 'app/entities/cv/cv.service';

@Component({
  selector: 'jhi-cv-list-result',
  templateUrl: './cv-list-result.component.html'
})
export class CvListResultlComponent implements OnInit {
  // @Input() cVa!:ICV;
  cVS?: ICV[];
  companies!: ICompany;
  searchForm = this.fb.group({
    name: [],
    phone: [],
    email: [],
    birthday: []
  });

  constructor(
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    protected companyService: CompanyService,
    protected router: Router,
    protected cVService: CVService
  ) {
    this.activatedRoute.queryParams.subscribe(data => {
      const res = {};
      res['name'] = data.hasOwnProperty('name') ? data['name'].trim() : '';
      res['phone'] = data.hasOwnProperty('phone') ? data['phone'].trim() : '';
      res['email'] = data.hasOwnProperty('email') ? data['email'].trim() : '';
      res['birthday'] = data.hasOwnProperty('birthday') ? data['birthday'].toString() : '';
      this.searchForm.patchValue(res);
      this.loadAll();
    });
  }

  ngOnInit(): void {}

  transition() {
    this.router.navigate(['/cv/list-result'], {
      queryParams: {
        ...this.getFormValues()
      }
    });
    this.loadAll();
  }
  loadAll() {
    this.cVService
      .findInHome({
        ...this.getFormValues()
      })
      .subscribe((res: HttpResponse<ICV[]>) => this.paginateCV(res.body!, res.headers));
  }
  getFormValues() {
    const res = {};
    const name = this.searchForm.get(['name'])!.value.trim();
    const phone = this.searchForm.get(['phone'])!.value.trim();
    const email = this.searchForm.get(['email'])!.value.trim();
    const birthday = this.searchForm.get(['birthday'])!.value.toString();
    if (name) {
      res['name'] = name;
    }

    if (phone) {
      res['phone'] = phone;
    }
    if (email) {
      res['email'] = email;
    }
    if (birthday) {
      res['birthday'] = birthday;
    }

    return res;
  }
  protected paginateCV(data: ICV[], headers: HttpHeaders) {
    this.cVS = data;
  }
}
