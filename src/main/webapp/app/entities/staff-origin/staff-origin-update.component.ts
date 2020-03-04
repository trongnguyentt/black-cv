import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IStaffOrigin, StaffOrigin } from 'app/shared/model/staff-origin.model';
import { StaffOriginService } from './staff-origin.service';
import { EMAIL_NOT_FOUND_TYPE } from 'app/shared/constants/error.constants';

@Component({
  selector: 'jhi-staff-origin-update',
  templateUrl: './staff-origin-update.component.html'
})
export class StaffOriginUpdateComponent implements OnInit {
  isSaving = false;
  error = false;
  errorEmailNotExists = false;
  success = false;
  editForm = this.fb.group({
    id: [],
    name: [],
    email: [],
    job: [],
    advantages: [],
    defect: [],
    more: [],
    status: []
  });

  constructor(
    protected staffOriginService: StaffOriginService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ staffOrigin }) => {
      this.updateForm(staffOrigin);
    });
  }

  updateForm(staffOrigin: IStaffOrigin): void {
    this.editForm.patchValue({
      id: staffOrigin.id,
      name: staffOrigin.name,
      email: staffOrigin.email,
      job: staffOrigin.job,
      advantages: staffOrigin.advantages,
      defect: staffOrigin.defect,
      more: staffOrigin.more,
      status: staffOrigin.status
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const staffOrigin = this.createFromForm();
    if (staffOrigin.id !== undefined) {
      this.subscribeToSaveResponse(this.staffOriginService.update(staffOrigin));
      this.requestReset(staffOrigin.email);
      this.router.navigate(['/staff-origin', staffOrigin.id, 'view']);
    } else {
      this.subscribeToSaveResponse(this.staffOriginService.create(staffOrigin));
      console.log(staffOrigin);
    }
  }
  requestReset(email: any): void {
    this.staffOriginService.save(email).subscribe(
      () => (this.success = true),
      (response: HttpErrorResponse) => {
        if (response.status === 400 && response.error.type === EMAIL_NOT_FOUND_TYPE) {
          this.errorEmailNotExists = true;
        } else {
          this.error = true;
        }
      }
    );
  }
  private createFromForm(): IStaffOrigin {
    return {
      ...new StaffOrigin(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      email: this.editForm.get(['email'])!.value,
      job: this.editForm.get(['job'])!.value,
      advantages: this.editForm.get(['advantages'])!.value,
      defect: this.editForm.get(['defect'])!.value,
      more: this.editForm.get(['more'])!.value,
      status: this.editForm.get(['status'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStaffOrigin>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
