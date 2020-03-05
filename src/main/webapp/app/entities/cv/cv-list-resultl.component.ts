import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {CV, ICV} from 'app/shared/model/cv.model';
import { FormBuilder } from '@angular/forms';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ICompany } from 'app/shared/model/company.model';
import { CompanyService } from 'app/entities/company/company.service';

@Component({
  selector: 'jhi-cv-list-result',
  templateUrl: './cv-list-result.component.html'
})
export class CvListResultlComponent implements OnInit {
// @Input() cVa!:ICV;
  cV: ICV | null = null;
  companies?: ICompany[];
  searchForm = this.fb.group({
    name: ['']
  });
  constructor(protected activatedRoute: ActivatedRoute, private fb: FormBuilder, protected companyService: CompanyService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cV }) => {
      this.cV = cV;
    });
  }
}
