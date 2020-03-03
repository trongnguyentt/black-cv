import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICompany, Company } from 'app/shared/model/company.model';
import { CompanyService } from './company.service';

@Component({
  selector: 'jhi-company-update',
  templateUrl: './company-update.component.html'
})
export class CompanyUpdateComponent implements OnInit {
  isSaving = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    businessAreas: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    address: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    status: [],
    email: [null, [Validators.required, Validators.pattern(this.emailPattern), Validators.minLength(1), Validators.maxLength(50)]]
  });

  constructor(protected companyService: CompanyService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ company }) => {
      this.updateForm(company);
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
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
