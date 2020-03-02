import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICV, CV } from 'app/shared/model/cv.model';
import { CVService } from './cv.service';
import { JhiAlertService, JhiParseLinks } from 'ng-jhipster';
import { IReason } from 'app/shared/model/reason.model';
import { ReasonService } from 'app/entities/reason/reason.service';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';

@Component({
  selector: 'jhi-cv-update',
  templateUrl: './cv-update.component.html'
})
export class CVUpdateComponent implements OnInit {
  isSaving = false;
  reason!: any[];
  links: any;
  a!: ICV;
  reasons!: IReason[];
  totalItems = 0;
  page!: number;
  itemsPerPage = ITEMS_PER_PAGE;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  editForm = this.fb.group({
    id: [],
    idCompany: [null],
    name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
    birthday: [null, [Validators.required]],
    phone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    email: [null, [Validators.required, Validators.pattern(this.emailPattern), Validators.minLength(1), Validators.maxLength(50)]],
    address: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
    job: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    gender: [],
    avatar: [null],
    reason: [],
    fileUploadCV: [null, [Validators.required]],
    status: []
  });
  predicate!: string;
  ascending!: boolean;
  iconPath: any;
  iconUpload!: File;
  dropdownSettings = {
    singleSelection: false,
    allowSearchFilter: false,
    enableCheckAll: false
  };

  constructor(
    protected cVService: CVService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private alertService: JhiAlertService,
    protected reasonService: ReasonService,
    protected parseLinks: JhiParseLinks,
    protected router: Router
  ) {}

  iconPath2: any;
  iconUpload2!: File;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cV }) => {
      this.updateForm(cV);
    });

    this.reasonService.query({}).subscribe((res: HttpResponse<IReason[]>) => this.paginateReason(res.body!, res.headers));
  }

  protected paginateReason(data: IReason[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link')!);
    this.totalItems = parseInt(headers.get('X-Total-Count')!, 10);
    this.reasons = data;
    this.reason = [];
    if (data.length != 0) {
      for (let reason of this.reasons) {
        if (reason.reasonName != undefined) {
          this.reason.push(reason.reasonName);
        }
      }
      console.log(this.reason);
    }
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  toArray(reason: any) {
    if (reason) {
      return reason.split(',');
    }
  }

  updateForm(cV: ICV): void {
    this.editForm.patchValue({
      id: cV.id,
      idCompany: cV.idCompany,
      name: cV.name,
      birthday: cV.birthday,
      phone: cV.phone,
      email: cV.email,
      address: cV.address,
      job: cV.job,
      gender: cV.gender,
      avatar: cV.avatar,
      reason: this.toArray(cV.reason),
      fileUploadCV: cV.fileUploadCV,
      status: cV.status
    });
    console.log(cV.reason);
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cV = this.createFromForm();
    console.log(cV.id);
    if (cV.id !== undefined) {
      this.subscribeToSaveResponse(this.cVService.update(cV, this.iconUpload, this.iconUpload2));
    } else {
      this.subscribeToSaveResponse(this.cVService.create(cV, this.iconUpload, this.iconUpload2));
    }
  }

  private createFromForm(): ICV {
    return {
      ...new CV(),
      id: this.editForm.get(['id'])!.value,
      idCompany: this.editForm.get(['idCompany'])!.value,
      name: this.editForm.get(['name'])!.value,
      birthday: this.editForm.get(['birthday'])!.value.toString(),
      phone: this.editForm.get(['phone'])!.value,
      email: this.editForm.get(['email'])!.value,
      address: this.editForm.get(['address'])!.value,
      job: this.editForm.get(['job'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      avatar: this.editForm.get(['avatar'])!.value,
      reason: this.editForm.get(['reason'])!.value.toString(),
      fileUploadCV: this.editForm.get(['fileUploadCV'])!.value,
      status: this.editForm.get(['status'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICV>>): void {
    result.subscribe(
      res => {
        if (res.body) {
          this.a = res.body;
        }
        console.log(this.a.id + 'xxxxx');
        this.isSaving = false;

        this.router.navigate(['/cv', this.a.id, 'view']);
      },
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

  getIcon2() {
    if (this.iconPath2) {
      return this.iconPath2;
    }
    if (this.editForm.get(['fileUploadCV'])!.value) {
      return this.editForm.get(['fileUploadCV'])!.value;
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

  selectIcon2(event) {
    const file = event.target.files[0];
    this.loadFile(
      file,
      result => {
        this.iconPath2 = result;
        this.iconUpload2 = file;
      },
      error => {
        this.alertService.error(error);
      }
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    const cV = this.createFromForm();
    if (cV.id !== null) {
      this.router.navigate(['/cv', cV.id, 'view']);
    } else {
      this.previousState();
    }
    console.log(cV.id);
    console.log(cV.address);
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
