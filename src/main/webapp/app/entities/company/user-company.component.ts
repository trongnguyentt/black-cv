import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ICompany, Company } from 'app/shared/model/company.model';
import { CompanyService } from './company.service';
import { COMPANY_ALREADY_USED_TYPE, EMAIL_ALREADY_USED_TYPE, LOGIN_ALREADY_USED_TYPE } from 'app/shared/constants/error.constants';
import { DetailService } from 'app/entities/company/detail.service';

@Component({
  selector: 'jhi-company-user-update',
  templateUrl: './user-company.component.html'
})
export class UserCompanyComponent implements OnInit {
  isSaving = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  errorEmailExists = false;
  errorUserExists = false;
  error = false;
  success = false;

  editForm = this.fb.group({
    id: [],
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/), Validators.minLength(1), Validators.maxLength(254)]],
    businessAreas: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(254)]],
    address: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(254)]],
    status: [],
    email: ['', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(254)]]
  });

  constructor(
    protected router: Router,
    protected detailService: DetailService,
    protected companyService: CompanyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe(({company}) => {
    //   this.updateForm(company);
    // });

    this.detailService.currentMessage.subscribe(data => {
      this.updateForm(data[0]);
    });
  }

  updateForm(company: ICompany): void {
    this.editForm.patchValue({
      id: company.id,
      name: company.name,
      businessAreas: company.businessAreas,
      address: company.address,
      status: company.status,
      email: company.email
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.errorEmailExists = false;
    this.errorUserExists = false;
    this.isSaving = true;
    const company = this.createFromForm();
    if (company.id !== undefined) {
      this.subscribeToSaveResponse(this.companyService.update(company));
    } else {
      this.subscribeToSaveResponse(this.companyService.create(company));
    }
  }

  private createFromForm(): ICompany {
    return {
      ...new Company(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      businessAreas: this.editForm.get(['businessAreas'])!.value,
      address: this.editForm.get(['address'])!.value,
      status: this.editForm.get(['status'])!.value,
      email: this.editForm.get(['email'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompany>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      response => this.onSaveError(response)
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(response: HttpErrorResponse): void {
    if (response.status === 400 && response.error.type === COMPANY_ALREADY_USED_TYPE) {
      this.errorUserExists = true;
    } else if (response.status === 400 && response.error.type === EMAIL_ALREADY_USED_TYPE) {
      this.errorEmailExists = true;
    } else {
      this.error = true;
    }
    this.isSaving = false;
  }
}
