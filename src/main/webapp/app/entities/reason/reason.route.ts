import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IReason, Reason } from 'app/shared/model/reason.model';
import { ReasonService } from './reason.service';
import { ReasonComponent } from './reason.component';
import { ReasonDetailComponent } from './reason-detail.component';
import { ReasonUpdateComponent } from './reason-update.component';

@Injectable({ providedIn: 'root' })
export class ReasonResolve implements Resolve<IReason> {
  constructor(private service: ReasonService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReason> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((reason: HttpResponse<Reason>) => {
          if (reason.body) {
            return of(reason.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Reason());
  }
}

export const reasonRoute: Routes = [
  {
    path: '',
    component: ReasonComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'blackcvApp.reason.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ReasonDetailComponent,
    resolve: {
      reason: ReasonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blackcvApp.reason.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ReasonUpdateComponent,
    resolve: {
      reason: ReasonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blackcvApp.reason.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ReasonUpdateComponent,
    resolve: {
      reason: ReasonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blackcvApp.reason.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
