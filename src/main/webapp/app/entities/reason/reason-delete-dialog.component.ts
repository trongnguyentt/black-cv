import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReason } from 'app/shared/model/reason.model';
import { ReasonService } from './reason.service';

@Component({
  templateUrl: './reason-delete-dialog.component.html'
})
export class ReasonDeleteDialogComponent {
  reason?: IReason;

  constructor(protected reasonService: ReasonService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.reasonService.delete(id).subscribe(() => {
      this.eventManager.broadcast('reasonListModification');
      this.activeModal.close();
    });
  }
}
