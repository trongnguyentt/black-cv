import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { Router } from '@angular/router';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ICV } from 'app/shared/model/cv.model';
import { CVService } from 'app/entities/cv/cv.service';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { JhiParseLinks } from 'ng-jhipster';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  cVS?: ICV[];
  // checkSearch?: boolean;
  account: Account | null = null;
  authSubscription?: Subscription;
  page!: number;
  itemsPerPage = ITEMS_PER_PAGE;
  predicate!: string;
  links: any;
  totalItems = 0;
  fail!: boolean;
  isSaving = false;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  mobNumberPattern = '^((\\+84-?)|0)?[0-9]{10}$';

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    protected router: Router,
    protected cVService: CVService,
    protected parseLinks: JhiParseLinks,
    private fb: FormBuilder,
    protected modalService: NgbModal
  ) {
    // this.checkSearch = true;
  }

  searchForm = this.fb.group({
    // phone: ['', [Validators.required, Validators.pattern(this.mobNumberPattern)]],
    // email: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(254), Validators.email]]
    phone: [''],
    email: ['']
  });

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  getFormValues() {
    const res = {};
    // const name = this.searchForm.get(['name'])!.value.trim();

    // const phone = this.searchForm.get(['email'])!.value.trim();
    // if (phone != null) {
    //   res['phone'] = phone;
    // }
    const email = this.searchForm.get(['email'])!.value.trim();
    if (email != null) {
      res['email'] = email;
      res['phone'] = email;
    }

    if (!email) {
      this.fail = true;
    }
    console.log(email);
    // console.log(phone);
    return res;
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  loadAll() {
    this.cVService
      .findInHome({
        page: this.page - 1,
        size: this.itemsPerPage,
        ...this.getFormValues()
      })
      .subscribe((res: HttpResponse<ICV[]>) => this.paginateCV(res.body!, res.headers));
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  protected paginateCV(data: ICV[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link')!);
    this.totalItems = parseInt(headers.get('X-Total-Count')!, 10);
    this.cVS = data;

    console.log(this.cVS);

    console.log(this.cVS.length);

    if (this.searchForm.get(['email'])!.value.trim()) {
      console.log(this.searchForm.get(['email']));
    } else {
      this.searchForm.patchValue({
        email: ''
      });
      console.log('abc' + this.searchForm.get(['email'])!.value);
    }

    if (this.searchForm.get(['phone'])!.value.trim()) {
      console.log(this.searchForm.get(['phone']));
    } else {
      this.searchForm.patchValue({
        phone: ''
      });
      console.log('123' + this.searchForm.get(['phone'])!.value);
    }

    if (this.cVS.length > 1) {
      this.router.navigate(['/cv/', 'list-result'], {
        queryParams: {
          email: this.searchForm.get(['email'])!.value.trim(),
          phone: this.searchForm.get(['email'])!.value.trim()
        }
      });
    } else if (this.cVS.length == 1) {
      // const modalRef = this.modalService.open(CVDetailComponent, { size: 'lg', backdrop: 'static' });
      // modalRef.componentInstance.cV = this.cVS[0];
      this.router.navigate(['/cv/', this.cVS[0].id, 'view']);
    } else {
      // this.modalService.open(NoResultComponent);
      // // console.log("sssss")
      this.router.navigate(['/cv', 'no-result']);
    }
    console.log(this.cVS);
  }

  onSearch() {
    this.loadAll();
  }

  // onCheck() {
  //   console.log('log:' + this.checkSearch);
  //   this.checkSearch = this.changeForm.get(['check'])!.value == true;
  // }
}
