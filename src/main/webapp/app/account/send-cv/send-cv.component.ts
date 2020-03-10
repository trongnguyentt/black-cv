import { Component, Renderer, ElementRef, ViewChild, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

import { EMAIL_NOT_FOUND_TYPE } from 'app/shared/constants/error.constants';
import { SendCvService } from 'app/account/send-cv/send-cv.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ICompany } from 'app/shared/model/company.model';
import { StaffOriginService } from 'app/entities/staff-origin/staff-origin.service';
import { Observable } from 'rxjs';
import { IStaffOrigin, StaffOrigin } from 'app/shared/model/staff-origin.model';
import { ListStaffService } from 'app/account/list-staff/list.service';

@Component({
  selector: 'jhi-send-cv',
  templateUrl: './send-cv.component.html'
})
export class SendCvComponent implements OnInit {
  @ViewChild('email', { static: false })
  email?: ElementRef;
  account!: Account;
  isSaving!: boolean;
  from!: any;
  to!: string;
  error = false;
  errorEmailNotExists = false;
  success = false;
  company!: ICompany;
  staffOrigin!: IStaffOrigin;
  resetRequestForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]]
  });

  listStaff!: IStaffOrigin[];
  listStaffLength?: number;

  // content!: string;
  // contentLength?: number;

  constructor(
    protected listStaffService: ListStaffService,
    private SendCvService: SendCvService,
    protected activatedRoute: ActivatedRoute,
    private renderer: Renderer,
    private fb: FormBuilder,
    protected router: Router,
    private accountService: AccountService,
    protected staffOriginService: StaffOriginService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ company }) => {
      this.company = company;
      console.log(this.company);
    });
  }

  toUnsigned(name: string) {
    name = name.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    name = name.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    name = name.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    name = name.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    name = name.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    name = name.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    name = name.replace(/đ/g, 'd');
    return name;
  }

  requestReset(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.account = account;
      }
    });
    this.to = this.account.email;
    this.from = this.company.email;

    const staffOrigin = this.createFromForm();
    this.subscribeToSaveResponse(this.staffOriginService.create(staffOrigin));

    this.staffOriginService
      .getListStaff(this.toUnsigned(this.resetRequestForm.get(['name'])!.value), this.resetRequestForm.get(['email'])!.value)
      .subscribe((res: HttpResponse<IStaffOrigin[]>) => this.list(res.body!));

    // if (this.company.name) {
    //   this.SendCvService.save(this.resetRequestForm.get(['info'])!.value).subscribe(
    //     () => (this.success = true),
    //     (response: HttpErrorResponse) => {
    //       if (response.status === 400 && response.error.type === EMAIL_NOT_FOUND_TYPE) {
    //         this.errorEmailNotExists = true;
    //       } else {
    //         this.error = true;
    //       }
    //     }
    //   );
    // }
  }

  createMessage(message: IStaffOrigin[]) {
    this.listStaffService.changeMessage(message);
    this.router.navigate(['/account/list-staff']);
  }

  // createLocal(local: string){
  //   this.listStaffService.changLocal(local);
  //   this.router.navigate(['/home']);
  // }

  protected list(data: IStaffOrigin[]) {
    this.listStaff = data;
    this.listStaffLength = data.length;
  }
  // protected backH(backHom: string) {
  //   this.content = backHom;
  //   this.contentLength = backHom.length;
  // }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStaffOrigin>>): void {
    result.subscribe(() => this.onSaveSuccess());
  }
  private createFromForm(): IStaffOrigin {
    return {
      ...new StaffOrigin(),
      id: undefined,
      name: this.resetRequestForm.get(['name'])!.value,
      email: this.resetRequestForm.get(['email'])!.value,
      job: undefined,
      advantages: undefined,
      defect: undefined,
      from: this.from,
      to: this.to,
      more: undefined,
      status: undefined
    };
  }
  protected onSaveSuccess(): void {
    this.isSaving = false;
    if (this.company.name) {
      this.SendCvService.save(this.resetRequestForm.get(['email'])!.value).subscribe(
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
  }
}
