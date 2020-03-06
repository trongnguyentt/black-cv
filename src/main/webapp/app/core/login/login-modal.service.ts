import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { LoginModalComponent } from 'app/shared/login/login.component';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginModalService {
  private isOpen = false;

  constructor(protected router: Router, private modalService: NgbModal) {}

  open(): void {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    const modalRef: NgbModalRef = this.router.navigate(['/login']);
    modalRef.result.finally(() => (this.isOpen = false));
  }
}
