import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IReason, Reason } from 'app/shared/model/reason.model';
import { ReasonService } from './reason.service';

@Component({
  selector: 'jhi-reason-update',
  templateUrl: './reason-update.component.html'
})
export class ReasonUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    descriptons: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(254)]],
    reasonName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(254)]],
    status: []
  });

  constructor(protected reasonService: ReasonService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reason }) => {
      this.updateForm(reason);
    });
  }

  updateForm(reason: IReason): void {
    this.editForm.patchValue({
      id: reason.id,
      descriptons: reason.descriptons,
      reasonName: reason.reasonName,
      status: reason.status
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reason = this.createFromForm();
    if (reason.id !== undefined) {
      this.subscribeToSaveResponse(this.reasonService.update(reason));
    } else {
      this.subscribeToSaveResponse(this.reasonService.create(reason));
    }
  }

  private createFromForm(): IReason {
    return {
      ...new Reason(),
      id: this.editForm.get(['id'])!.value,
      descriptons: this.editForm.get(['descriptons'])!.value,
      reasonName: this.editForm.get(['reasonName'])!.value,
      status: this.editForm.get(['status'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReason>>): void {
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
