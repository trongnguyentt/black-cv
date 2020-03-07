import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IReasonList, ReasonList } from 'app/shared/model/reason-list.model';
import { ReasonListService } from './reason-list.service';
import { ReasonListComponent } from './reason-list.component';
import { ReasonListDetailComponent } from './reason-list-detail.component';
import { ReasonListUpdateComponent } from './reason-list-update.component';

@Injectable({ providedIn: 'root' })
export class ReasonListResolve implements Resolve<IReasonList> {
  constructor(private service: ReasonListService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReasonList> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((reasonList: HttpResponse<ReasonList>) => {
          if (reasonList.body) {
            return of(reasonList.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ReasonList());
  }
}

export const reasonListRoute: Routes = [
  {
    path: '',
    component: ReasonListComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      defaultSort: 'id,asc',
      pageTitle: 'blackcvApp.reasonList.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ReasonListDetailComponent,
    resolve: {
      reasonList: ReasonListResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'blackcvApp.reasonList.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ReasonListUpdateComponent,
    resolve: {
      reasonList: ReasonListResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'blackcvApp.reasonList.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ReasonListUpdateComponent,
    resolve: {
      reasonList: ReasonListResolve
    },
    data: {
      authorities: ['ROLE_ADMIN'],
      pageTitle: 'blackcvApp.reasonList.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
