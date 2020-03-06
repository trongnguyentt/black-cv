import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IReasonList, ReasonList } from 'app/shared/model/reason-list.model';
import { ReasonListService } from './reason-list.service';

@Component({
  selector: 'jhi-reason-list-update',
  templateUrl: './reason-list-update.component.html'
})
export class ReasonListUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    idCV: ['', [Validators.required]],
    document: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(254)]],
    id_reason: ['', [Validators.required]],
    status: []
  });

  constructor(protected reasonListService: ReasonListService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reasonList }) => {
      this.updateForm(reasonList);
    });
  }

  updateForm(reasonList: IReasonList): void {
    this.editForm.patchValue({
      id: reasonList.id,
      idCV: reasonList.idCV,
      document: reasonList.document,
      id_reason: reasonList.id_reason,
      status: reasonList.status
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reasonList = this.createFromForm();
    if (reasonList.id !== undefined) {
      this.subscribeToSaveResponse(this.reasonListService.update(reasonList));
    } else {
      this.subscribeToSaveResponse(this.reasonListService.create(reasonList));
    }
  }

  private createFromForm(): IReasonList {
    return {
      ...new ReasonList(),
      id: this.editForm.get(['id'])!.value,
      idCV: this.editForm.get(['idCV'])!.value,
      document: this.editForm.get(['document'])!.value,
      id_reason: this.editForm.get(['id_reason'])!.value,
      status: this.editForm.get(['status'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReasonList>>): void {
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
