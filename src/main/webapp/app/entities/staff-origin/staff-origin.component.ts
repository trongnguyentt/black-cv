import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStaffOrigin } from 'app/shared/model/staff-origin.model';
import { StaffOriginService } from './staff-origin.service';
import { StaffOriginDeleteDialogComponent } from './staff-origin-delete-dialog.component';
import { FormBuilder } from '@angular/forms';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { Account } from 'app/core/user/account.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { StaffOriginDetailComponent } from 'app/entities/staff-origin/staff-origin-detail.component';

@Component({
  selector: 'jhi-staff-origin',
  templateUrl: './staff-origin.component.html'
})
export class StaffOriginComponent implements OnInit, OnDestroy {
  staffOrigins?: IStaffOrigin[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  account!: Account;
  ngbPaginationPage = 1;
  page!: number;
  itemsPerPage = ITEMS_PER_PAGE;
  predicate!: string;
  ascending!: boolean;
  links: any;
  searchForm = this.fb.group({
    name: [''],
    email: ['']
  });

  constructor(
    protected staffOriginService: StaffOriginService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    private fb: FormBuilder,
    protected parseLinks: JhiParseLinks,
    protected router: Router,
    protected activatedRoute: ActivatedRoute,
    private accountService: AccountService
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page ? page : this.page;
    this.staffOriginService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IStaffOrigin[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  protected onSuccess(data: IStaffOrigin[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/staff-origin'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.staffOrigins = data ? data : [];
  }

  loadAll() {
    this.staffOriginService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
        ...this.getFormValues()
      })
      .subscribe((res: HttpResponse<IStaffOrigin[]>) => this.paginateStaffOrigin(res.body!, res.headers));
    this.searchForm = this.fb.group({
      name: [''],
      email: ['']
    });
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  getFormValues() {
    const res = {};
    const name = this.searchForm.get(['name'])!.value.trim();
    if (name) {
      res['name'] = name;
    }

    const email = this.searchForm.get(['email'])!.value.trim();
    if (email) {
      res['email'] = email;
    }

    return res;
  }

  onSearch() {
    this.loadAll();
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
    this.loadAll();
    this.registerChangeInStaffOrigins();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IStaffOrigin): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInStaffOrigins(): void {
    this.eventSubscriber = this.eventManager.subscribe('staffOriginListModification', () => this.loadAll());
  }

  delete(staffOrigin: IStaffOrigin): void {
    const modalRef = this.modalService.open(StaffOriginDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.staffOrigin = staffOrigin;
  }

  protected paginateStaffOrigin(data: IStaffOrigin[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link')!);
    this.totalItems = parseInt(headers.get('X-Total-Count')!, 10);
    this.staffOrigins = data;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }

  details(staffOrigin: IStaffOrigin): void {
    const modalRef = this.modalService.open(StaffOriginDetailComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.staffOrigin = staffOrigin;
  }
}
