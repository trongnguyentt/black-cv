import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStaffOrigin } from 'app/shared/model/staff-origin.model';
import { StaffOriginService } from './staff-origin.service';

@Component({
  templateUrl: './staff-origin-delete-dialog.component.html'
})
export class StaffOriginDeleteDialogComponent {
  staffOrigin?: IStaffOrigin;

  constructor(
    protected staffOriginService: StaffOriginService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.staffOriginService.delete(id).subscribe(() => {
      this.eventManager.broadcast('staffOriginListModification');
      this.activeModal.close();
    });
  }
}
