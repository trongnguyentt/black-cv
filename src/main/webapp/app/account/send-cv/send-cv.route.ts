import {ActivatedRouteSnapshot, Resolve, Route, Router} from '@angular/router';

import {SendCvComponent} from './send-cv.component';
import {Injectable} from "@angular/core";
import {Company, ICompany} from "app/shared/model/company.model";
import {CompanyService} from "app/entities/company/company.service";
import {EMPTY, Observable, of} from "rxjs";
import {flatMap} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class CompanyResolve implements Resolve<ICompany> {
  constructor(private service: CompanyService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ICompany> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((company: HttpResponse<Company>) => {
          if (company.body) {
            return of(company.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Company());
  }
}

export const sendCvRoute: Route = {
  path: 'send-cv/:id',
  component: SendCvComponent,
  resolve: {
    company: CompanyResolve
  },
  data: {
    authorities: [],
    pageTitle: 'global.menu.account.password'
  }
};
