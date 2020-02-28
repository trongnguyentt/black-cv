import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICompany } from 'app/shared/model/company.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CompanyService } from './company.service';
import { CompanyDeleteDialogComponent } from './company-delete-dialog.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'jhi-company',
  templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit, OnDestroy {
  companies?: ICompany[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  links: any;
  searchForm = this.fb.group({
    name: [''],
    business: ['']
  });

  constructor(
    protected companyService: CompanyService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    private fb: FormBuilder,
    protected parseLinks: JhiParseLinks,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page ? page : this.page;
    this.companyService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<ICompany[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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

    const business = this.searchForm.get(['business'])!.value.trim();
    if (business) {
      res['business'] = business;
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
    this.registerChangeInCompanies();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICompany): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCompanies(): void {
    this.eventSubscriber = this.eventManager.subscribe('companyListModification', () => this.loadPage());
  }

  delete(company: ICompany): void {
    const modalRef = this.modalService.open(CompanyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.company = company;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: ICompany[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/company'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.companies = data ? data : [];
  }

  loadAll() {
    this.companyService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
        ...this.getFormValues()
      })
      .subscribe((res: HttpResponse<ICompany[]>) => this.paginateCompany(res.body!, res.headers));

    this.searchForm = this.fb.group({
      name: [''],
      business: ['']
    });
  }

  onSearch() {
    this.loadAll();
  }

  protected paginateCompany(data: ICompany[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link')!);
    this.totalItems = parseInt(headers.get('X-Total-Count')!, 10);
    this.companies = data;
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
