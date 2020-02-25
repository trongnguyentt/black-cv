import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlackcvSharedModule } from 'app/shared/shared.module';
import { ReasonListComponent } from './reason-list.component';
import { ReasonListDetailComponent } from './reason-list-detail.component';
import { ReasonListUpdateComponent } from './reason-list-update.component';
import { ReasonListDeleteDialogComponent } from './reason-list-delete-dialog.component';
import { reasonListRoute } from './reason-list.route';

@NgModule({
  imports: [BlackcvSharedModule, RouterModule.forChild(reasonListRoute)],
  declarations: [ReasonListComponent, ReasonListDetailComponent, ReasonListUpdateComponent, ReasonListDeleteDialogComponent],
  entryComponents: [ReasonListDeleteDialogComponent]
})
export class BlackcvReasonListModule {}
