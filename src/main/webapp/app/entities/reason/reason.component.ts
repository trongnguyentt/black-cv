import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IReason } from 'app/shared/model/reason.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ReasonService } from './reason.service';
import { ReasonDeleteDialogComponent } from './reason-delete-dialog.component';
import { ICompany } from 'app/shared/model/company.model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'jhi-reason',
  templateUrl: './reason.component.html'
})
export class ReasonComponent implements OnInit, OnDestroy {
  reasons?: IReason[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  links: any;
  searchForm = this.fb.group({
    name: ['']
  });

  constructor(
    protected reasonService: ReasonService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    private fb: FormBuilder,
    protected parseLinks: JhiParseLinks,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page ? page : this.page;
    this.reasonService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IReason[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  getFormValues() {
    const res = {};
    // const countryName = this.searchForm.get(['countryName']).value.trim();
    // const countryCode = this.searchForm.get(['countryCode']).value.trim();
    const name = this.searchForm.get(['name'])!.value.trim();
    if (name) {
      res['name'] = name;
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
    this.registerChangeInReasons();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IReason): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInReasons(): void {
    this.eventSubscriber = this.eventManager.subscribe('reasonListModification', () => this.loadPage());
  }

  delete(reason: IReason): void {
    const modalRef = this.modalService.open(ReasonDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.reason = reason;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IReason[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/reason'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.reasons = data ? data : [];
  }

  loadAll() {
    this.reasonService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
        ...this.getFormValues()
      })
      .subscribe((res: HttpResponse<IReason[]>) => this.paginateReason(res.body!, res.headers));
  }

  onSearch() {
    this.loadAll();
  }

  protected paginateReason(data: IReason[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link')!);
    this.totalItems = parseInt(headers.get('X-Total-Count')!, 10);
    this.reasons = data;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
