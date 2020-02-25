import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICV } from 'app/shared/model/cv.model';
import { CVService } from './cv.service';

@Component({
  templateUrl: './cv-delete-dialog.component.html'
})
export class CVDeleteDialogComponent {
  cV?: ICV;

  constructor(protected cVService: CVService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cVService.delete(id).subscribe(() => {
      this.eventManager.broadcast('cVListModification');
      this.activeModal.close();
    });
  }
}
