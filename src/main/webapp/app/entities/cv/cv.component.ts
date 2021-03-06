import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICV } from 'app/shared/model/cv.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CVService } from './cv.service';
import { CVDeleteDialogComponent } from './cv-delete-dialog.component';
import { FormBuilder } from '@angular/forms';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { ReasonService } from 'app/entities/reason/reason.service';
import { CompanyService } from 'app/entities/company/company.service';
import { ICompany } from 'app/shared/model/company.model';
import { CVDetailComponent } from 'app/entities/cv/cv-detail.component';

@Component({
  selector: 'jhi-cv',
  templateUrl: './cv.component.html'
})
export class CVComponent implements OnInit, OnDestroy {
  cVS!: ICV[];
  isCheck?: ICompany[];
  isNew!: boolean;
  isRedirectCompany!: boolean;
  eventSubscriber?: Subscription;
  totalItems = 0;
  account!: Account;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  links: any;
  checkRole?: boolean;
  searchForm = this.fb.group({
    name: [''],
    phone: [''],
    email: [''],
    login: [''],
    author: []
  });

  constructor(
    protected cVService: CVService,
    protected companyService: CompanyService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    private fb: FormBuilder,
    protected parseLinks: JhiParseLinks,
    private accountService: AccountService
  ) {
    this.checkRole = true;
    this.isNew = false;
    this.isRedirectCompany = false;
  }

  loadPage(page?: number): void {
    const pageToLoad: number = page ? page : this.page;
    this.cVService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<ICV[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  getFormValues() {
    const res = {};
    const name = this.searchForm.get(['name'])!.value.trim();
    const phone = this.searchForm.get(['phone'])!.value.trim();
    const email = this.searchForm.get(['email'])!.value.trim();
    const login = this.account.login;
    const author = this.account.authorities;
    if (name) {
      res['name'] = name;
    }

    if (phone) {
      res['phone'] = phone;
    }

    if (email) {
      res['email'] = email;
    }

    if (login) {
      res['login'] = login;
    }
    if (author) {
      res['author'] = author;
    }
    return res;
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      // this.loadPage();
    });
    this.accountService.identity().subscribe(account => {
      if (account) {
        this.account = account;
      }
    });

    this.checkRole = !this.account.authorities.includes('ROLE_ADMIN');

    this.loadAll();
    this.checkCompanyExist();
    console.log('isNew: ' + this.isNew);
    console.log('isCompanyNew: ' + this.isRedirectCompany);
    this.registerChangeInCVS();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  checkCompanyExist(): void {
    this.companyService.checkExist().subscribe((res: HttpResponse<ICompany[]>) => this.getLen(res.body));
  }

  protected getLen(data: ICompany[] | null) {
    this.isCheck = data ? data : [];
    console.log('isCheck:' + this.isCheck.length);
    if (this.isCheck.length != 0) {
      this.cVService.changeMessage(this.cVS);
      this.isNew = true;
      console.log('isNew:' + this.isNew);
      // this.router.navigate(['/cv/new']);
    } else {
      this.isRedirectCompany = true;
      console.log('isRedirectCompany:' + this.isRedirectCompany);
      // this.router.navigate(['/company/new']);
    }
  }

  trackId(index: number, item: ICV): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCVS(): void {
    this.eventSubscriber = this.eventManager.subscribe('cVListModification', () => this.loadPage());
  }

  details(cV: ICV, id: number): void {
    const modalRef = this.modalService.open(CVDetailComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cV = cV;
    modalRef.componentInstance.id = id;
  }

  delete(cV: ICV): void {
    const modalRef = this.modalService.open(CVDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cV = cV;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: ICV[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/cv'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.cVS = data ? data : [];
  }

  loadAll() {
    this.cVService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
        ...this.getFormValues()
      })
      .subscribe((res: HttpResponse<ICV[]>) => this.paginateCV(res.body!, res.headers));
    this.searchForm = this.fb.group({
      name: [''],
      phone: [''],
      email: ['']
    });
  }

  onSearch() {
    this.loadAll();
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  protected paginateCV(data: ICV[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link')!);
    this.totalItems = parseInt(headers.get('X-Total-Count')!, 10);
    this.cVS = data;
    // for (let i = 0; i < data.length; i++) {
    //   this.companyService.find(data[i].idCompany!).subscribe(
    //     (data) => {
    //       this.temp = data.body!;
    //       this.cVS[i].nameCompany = this.temp!.name!;
    //     }
    //   );
    // }
  }
}
