import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlackcvSharedModule } from 'app/shared/shared.module';
import { StaffOriginComponent } from './staff-origin.component';
import { StaffOriginDetailComponent } from './staff-origin-detail.component';
import { StaffOriginUpdateComponent } from './staff-origin-update.component';
import { StaffOriginDeleteDialogComponent } from './staff-origin-delete-dialog.component';
import { staffOriginRoute } from './staff-origin.route';

@NgModule({
  imports: [BlackcvSharedModule, RouterModule.forChild(staffOriginRoute)],
  declarations: [StaffOriginComponent, StaffOriginDetailComponent, StaffOriginUpdateComponent, StaffOriginDeleteDialogComponent],
  entryComponents: [StaffOriginDeleteDialogComponent]
})
export class BlackcvStaffOriginModule {}
