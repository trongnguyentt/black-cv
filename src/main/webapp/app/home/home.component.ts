import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';

import {LoginModalService} from 'app/core/login/login-modal.service';
import {AccountService} from 'app/core/auth/account.service';
import {Account} from 'app/core/user/account.model';
import {Router} from "@angular/router";
import {HttpHeaders, HttpResponse} from "@angular/common/http";
import {ICV} from "app/shared/model/cv.model";
import {CVService} from "app/entities/cv/cv.service";
import {ITEMS_PER_PAGE} from "app/shared/constants/pagination.constants";
import {JhiParseLinks} from "ng-jhipster";
import {FormBuilder} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  cVS?: ICV[];
  account: Account | null = null;
  authSubscription?: Subscription;
  page!: number;
  itemsPerPage = ITEMS_PER_PAGE;
  predicate!: string;
  links: any;
  totalItems = 0;
  fail! :boolean;
  constructor(private accountService: AccountService,
              private loginModalService: LoginModalService,
              protected router: Router,
              protected cVService: CVService,
              protected parseLinks: JhiParseLinks,
              private fb: FormBuilder,protected modalService: NgbModal) {

  }

  searchForm = this.fb.group({
    name: [''],
    phone: [''],
    email: [''],
    birthday: ['']
  });

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }

  getFormValues() {
    const res = {};
    const name = this.searchForm.get(['name'])!.value.trim();
    const phone = this.searchForm.get(['phone'])!.value.trim();
    const email = this.searchForm.get(['email'])!.value.trim();
    const birthday = this.searchForm.get(['birthday'])!.value.toString();
    if (name) {
      res['name'] = name;
    }

    if (phone) {
      res['phone'] = phone;
    }
    if (email) {
      res['email'] = email;
    }
    if (birthday) {
      res['birthday'] = birthday;
    }
    if(!name||!phone||!email||!birthday){
      this.fail=true;
    }
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
      .subscribe(
        (res: HttpResponse<ICV[]>) => this.paginateCV(res.body!, res.headers)
      );
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
    console.log(this.cVS.length)
    if (this.cVS.length!=0) {
      this.router.navigate(['/cv', this.cVS[0].id, 'view']);
    } else {
      // this.modalService.open(NoResultComponent);
      // // console.log("sssss")
      this.router.navigate(['/cv','no-result']);
    }
    console.log(this.cVS)
  }

  onSearch() {
    this.loadAll();
  }
}
