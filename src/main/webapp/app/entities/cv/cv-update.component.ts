import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

import {ICV, CV} from 'app/shared/model/cv.model';
import {CVService} from './cv.service';
import {JhiAlertService} from "ng-jhipster";

@Component({
  selector: 'jhi-cv-update',
  templateUrl: './cv-update.component.html'
})
export class CVUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    idCompany: [],
    name: [],
    phone: [],
    email: [],
    address: [],
    job: [],
    gender: [],
    avatar: [],
    fileUploadCV: [],
    status: []
  });
  iconPath: any;
  iconUpload: File;

  constructor(protected cVService: CVService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder,
              private alertService: JhiAlertService) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({cV}) => {
      this.updateForm(cV);
    });
  }

  updateForm(cV: ICV): void {
    this.editForm.patchValue({
      id: cV.id,
      idCompany: cV.idCompany,
      name: cV.name,
      phone: cV.phone,
      email: cV.email,
      address: cV.address,
      job: cV.job,
      gender: cV.gender,
      avatar: cV.avatar,
      fileUploadCV: cV.fileUploadCV,
      status: cV.status
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cV = this.createFromForm();
    if (cV.id !== undefined) {
      this.subscribeToSaveResponse(this.cVService.update(cV,this.iconUpload));
    } else {
      this.subscribeToSaveResponse(this.cVService.create(cV, this.iconUpload));
    }
  }

  private createFromForm(): ICV {
    return {
      ...new CV(),
      id: this.editForm.get(['id'])!.value,
      idCompany: this.editForm.get(['idCompany'])!.value,
      name: this.editForm.get(['name'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      email: this.editForm.get(['email'])!.value,
      address: this.editForm.get(['address'])!.value,
      job: this.editForm.get(['job'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      avatar: this.editForm.get(['avatar'])!.value,
      fileUploadCV: this.editForm.get(['fileUploadCV'])!.value,
      status: this.editForm.get(['status'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICV>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  getIcon() {
    if (this.iconPath) {
      return this.iconPath;
    }
    if (this.editForm.get(['avatar'])!.value) {
      return this.editForm.get(['avatar'])!.value;
    }
    return null;
  }

  selectIcon(event) {
    const file = event.target.files[0];
    this.loadFile(
      file,
      result => {
        this.iconPath = result;
        this.iconUpload = file;
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  loadFile(file: File, success?, error?) {
    if (!file || !['image/jpeg', 'image/jpg', 'image/bmp', 'image/png'].includes(file.type)) {
      return error('file.error.format');
    }
    if (file.size <= 0) {
      return error('file.error.minFileSize');
    }
    if (file.size > 5120 * 1024) {
      return error('file.error.maxFileSize');
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      success(reader.result);
    };
  }
}
