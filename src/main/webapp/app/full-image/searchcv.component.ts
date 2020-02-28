import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'app/entities/company/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-searchcv',
  templateUrl: './searchcv.component.html',
  styleUrls: ['./searchcv.component.scss']
})
export class SearchcvComponent implements OnInit {
  constructor(
    protected companyService: CompanyService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  ngOnInit() {}
}
