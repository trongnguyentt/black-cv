import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStaffOrigin } from 'app/shared/model/staff-origin.model';
import { StaffOriginService } from './staff-origin.service';
import { StaffOriginDeleteDialogComponent } from './staff-origin-delete-dialog.component';

@Component({
  selector: 'jhi-staff-origin',
  templateUrl: './staff-origin.component.html'
})
export class StaffOriginComponent implements OnInit, OnDestroy {
  staffOrigins?: IStaffOrigin[];
  eventSubscriber?: Subscription;

  constructor(
    protected staffOriginService: StaffOriginService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.staffOriginService.query().subscribe((res: HttpResponse<IStaffOrigin[]>) => {
      this.staffOrigins = res.body ? res.body : [];
    });
  }

  ngOnInit(): void {
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
}
