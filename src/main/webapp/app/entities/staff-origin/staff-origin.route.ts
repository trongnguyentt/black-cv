import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IStaffOrigin, StaffOrigin } from 'app/shared/model/staff-origin.model';
import { StaffOriginService } from './staff-origin.service';
import { StaffOriginComponent } from './staff-origin.component';
import { StaffOriginDetailComponent } from './staff-origin-detail.component';
import { StaffOriginUpdateComponent } from './staff-origin-update.component';
import { CompanyResolve } from 'app/entities/company/company.route';

@Injectable({ providedIn: 'root' })
export class StaffOriginResolve implements Resolve<IStaffOrigin> {
  constructor(private service: StaffOriginService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStaffOrigin> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((staffOrigin: HttpResponse<StaffOrigin>) => {
          if (staffOrigin.body) {
            return of(staffOrigin.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new StaffOrigin());
  }
}

export const staffOriginRoute: Routes = [
  {
    path: '',
    component: StaffOriginComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blackcvApp.staffOrigin.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StaffOriginDetailComponent,
    resolve: {
      staffOrigin: StaffOriginResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blackcvApp.staffOrigin.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StaffOriginUpdateComponent,
    resolve: {
      staffOrigin: StaffOriginResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blackcvApp.staffOrigin.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StaffOriginUpdateComponent,
    resolve: {
      staffOrigin: StaffOriginResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blackcvApp.staffOrigin.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
