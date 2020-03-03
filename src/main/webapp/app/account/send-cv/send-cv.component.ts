import {Component, AfterViewInit, Renderer, ElementRef, ViewChild, OnInit} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

import { EMAIL_NOT_FOUND_TYPE } from 'app/shared/constants/error.constants';
import {PasswordResetInitService} from "app/account/password-reset/init/password-reset-init.service";
import {SendCvService} from "app/account/send-cv/send-cv.service";
import {AccountService} from "app/core/auth/account.service";
import {Account} from "app/core/user/account.model";
import {ActivatedRoute} from "@angular/router";
import {ICompany} from "app/shared/model/company.model";

@Component({
  selector: 'jhi-send-cv',
  templateUrl: './send-cv.component.html'
})
export class SendCvComponent implements OnInit {
  @ViewChild('email', { static: false })
  email?: ElementRef;
  account!: Account;
  error = false;
  errorEmailNotExists = false;
  success = false;
  company!: ICompany;
  resetRequestForm = this.fb.group({
    info: ['']
  });

  constructor(private SendCvService: SendCvService, protected activatedRoute: ActivatedRoute,private renderer: Renderer, private fb: FormBuilder,private accountService: AccountService,) {}
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ company }) => {
      this.company = company;
      console.log(this.company)
    });
  }
  requestReset(): void {
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.account = account;
      }
    });

    if(this.company.name){
    this.SendCvService.save(this.resetRequestForm.get(['info'])!.value,this.account.login,this.company.name).subscribe(
      () => (this.success = true),
      (response: HttpErrorResponse) => {
        if (response.status === 400 && response.error.type === EMAIL_NOT_FOUND_TYPE) {
          this.errorEmailNotExists = true;
        } else {
          this.error = true;
        }
      }
    );}
  }
}
