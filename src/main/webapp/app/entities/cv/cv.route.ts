import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICV, CV } from 'app/shared/model/cv.model';
import { CVService } from './cv.service';
import { CVComponent } from './cv.component';
import { CVDetailComponent } from './cv-detail.component';
import { CVUpdateComponent } from './cv-update.component';
import { CvNoResultlComponent } from 'app/entities/cv/cv-no-resultl.component';

@Injectable({ providedIn: 'root' })
export class CVResolve implements Resolve<ICV> {
  constructor(private service: CVService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICV> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((cV: HttpResponse<CV>) => {
          if (cV.body) {
            return of(cV.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CV());
  }
}

export const cVRoute: Routes = [
  {
    path: '',
    component: CVComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'blackcvApp.cV.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CVDetailComponent,
    resolve: {
      cV: CVResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blackcvApp.cV.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CVUpdateComponent,
    resolve: {
      cV: CVResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blackcvApp.cV.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CVUpdateComponent,
    resolve: {
      cV: CVResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blackcvApp.cV.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'no-result',
    component: CvNoResultlComponent,
    resolve: {
      cV: CVResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'blackcvApp.cV.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
