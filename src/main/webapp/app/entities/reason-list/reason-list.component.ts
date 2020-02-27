import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IReasonList } from 'app/shared/model/reason-list.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ReasonListService } from './reason-list.service';
import { ReasonListDeleteDialogComponent } from './reason-list-delete-dialog.component';
import { FormBuilder } from '@angular/forms';
import { ICompany } from 'app/shared/model/company.model';

@Component({
  selector: 'jhi-reason-list',
  templateUrl: './reason-list.component.html'
})
export class ReasonListComponent implements OnInit, OnDestroy {
  reasonLists?: IReasonList[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  links: any;
  searchForm = this.fb.group({
    cv: [''],
    reason: ['']
  });

  constructor(
    protected reasonListService: ReasonListService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    private fb: FormBuilder,
    protected parseLinks: JhiParseLinks
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page ? page : this.page;
    this.reasonListService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IReasonList[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  getFormValues() {
    const res = {};
    // const countryName = this.searchForm.get(['countryName']).value.trim();
    // const countryCode = this.searchForm.get(['countryCode']).value.trim();
    const name = this.searchForm.get(['cv'])!.value.trim();
    if (name) {
      res['cv'] = name;
    }

    const reason = this.searchForm.get(['reason'])!.value.trim();
    if (reason) {
      res['reason'] = reason;
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
    this.loadAll();
    this.registerChangeInReasonLists();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IReasonList): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInReasonLists(): void {
    this.eventSubscriber = this.eventManager.subscribe('reasonListListModification', () => this.loadPage());
  }

  delete(reasonList: IReasonList): void {
    const modalRef = this.modalService.open(ReasonListDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.reasonList = reasonList;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IReasonList[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/reason-list'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.reasonLists = data ? data : [];
  }

  loadAll() {
    this.reasonListService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
        ...this.getFormValues()
      })
      .subscribe((res: HttpResponse<IReasonList[]>) => this.paginateReasonList(res.body!, res.headers));

    this.searchForm = this.fb.group({
      cv: [''],
      reason: ['']
    });
  }

  onSearch() {
    this.loadAll();
  }

  protected paginateReasonList(data: IReasonList[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link')!);
    this.totalItems = parseInt(headers.get('X-Total-Count')!, 10);
    this.reasonLists = data;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
