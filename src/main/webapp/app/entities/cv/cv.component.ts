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
import {FormBuilder} from "@angular/forms";
import {AccountService} from "app/core/auth/account.service";
import {Account} from "app/core/user/account.model";
import {IReason} from "app/shared/model/reason.model";
import {ReasonService} from "app/entities/reason/reason.service";


@Component({
  selector: 'jhi-cv',
  templateUrl: './cv.component.html'
})
export class CVComponent implements OnInit, OnDestroy {
  cVS?: ICV[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  account!: Account;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  links: any;
  searchForm = this.fb.group({
    name: [''],
    login: [''],
    author: []

  });

  constructor(
    protected cVService: CVService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    private fb: FormBuilder,
    protected parseLinks: JhiParseLinks,
    private accountService: AccountService,
    protected reasonService: ReasonService,
  ) {}

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
    const name=this.searchForm.get(['name'])!.value.trim();
    const login=this.account.login;
    const author=this.account.authorities;
    if (name) {
      res['name'] = name;
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
    // this.reasonService
    //   .query({
    //     page: this.page - 1,
    //     size: this.itemsPerPage,
    //     sort: this.sort(),
    //   })
    //   .subscribe((res: HttpResponse<IReason[]>) => this.paginateReason(res.body!, res.headers));

    this.loadAll()
    this.registerChangeInCVS();


  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICV): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCVS(): void {
    this.eventSubscriber = this.eventManager.subscribe('cVListModification', () => this.loadPage());
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
  }
}
