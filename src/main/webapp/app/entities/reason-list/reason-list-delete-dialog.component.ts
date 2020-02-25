import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReasonList } from 'app/shared/model/reason-list.model';
import { ReasonListService } from './reason-list.service';

@Component({
  templateUrl: './reason-list-delete-dialog.component.html'
})
export class ReasonListDeleteDialogComponent {
  reasonList?: IReasonList;

  constructor(
    protected reasonListService: ReasonListService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.reasonListService.delete(id).subscribe(() => {
      this.eventManager.broadcast('reasonListListModification');
      this.activeModal.close();
    });
  }
}
