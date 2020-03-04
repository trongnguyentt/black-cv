import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'company',
        loadChildren: () => import('./company/company.module').then(m => m.BlackcvCompanyModule)
      },
      {
        path: 'cv',
        loadChildren: () => import('./cv/cv.module').then(m => m.BlackcvCVModule)
      },
      {
        path: 'reason-list',
        loadChildren: () => import('./reason-list/reason-list.module').then(m => m.BlackcvReasonListModule)
      },
      {
        path: 'reason',
        loadChildren: () => import('./reason/reason.module').then(m => m.BlackcvReasonModule)
      },
      {
        path: 'staff-origin',
        loadChildren: () => import('./staff-origin/staff-origin.module').then(m => m.BlackcvStaffOriginModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class BlackcvEntityModule {}
