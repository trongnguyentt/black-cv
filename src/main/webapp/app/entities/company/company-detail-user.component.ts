import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ICompany } from 'app/shared/model/company.model';
import { DetailService } from 'app/entities/company/detail.service';

@Component({
  selector: 'jhi-company-detail-user',
  templateUrl: './company-detail-user.component.html'
})
export class CompanyDetailUserComponent implements OnInit {
  company: ICompany | null = null;

  constructor(private location: Location, protected detailService: DetailService, protected router: Router) {}

  ngOnInit(): void {
    this.detailService.currentMessage.subscribe(data => {
      this.company = data[0];
      // let result = '';
      // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      // const charactersLength = characters.length;
      // for (let i = 0; i < 10; i++) {
      //   result += characters.charAt(Math.floor(Math.random() * charactersLength));
      // }
      // this.location.replaceState('/company' + '/view/' + result);
    });
  }

  previousState(): void {
    this.router.navigate(['/']);
  }
}
