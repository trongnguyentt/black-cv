import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlackcvSharedModule } from 'app/shared/shared.module';
import { ReasonComponent } from './reason.component';
import { ReasonDetailComponent } from './reason-detail.component';
import { ReasonUpdateComponent } from './reason-update.component';
import { ReasonDeleteDialogComponent } from './reason-delete-dialog.component';
import { reasonRoute } from './reason.route';

@NgModule({
  imports: [BlackcvSharedModule, RouterModule.forChild(reasonRoute)],
  declarations: [ReasonComponent, ReasonDetailComponent, ReasonUpdateComponent, ReasonDeleteDialogComponent],
  entryComponents: [ReasonDeleteDialogComponent]
})
export class BlackcvReasonModule {}
