import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlackcvSharedModule } from 'app/shared/shared.module';
import { CVComponent } from './cv.component';
import { CVDetailComponent } from './cv-detail.component';
import { CVUpdateComponent } from './cv-update.component';
import { CVDeleteDialogComponent } from './cv-delete-dialog.component';
import { cVRoute } from './cv.route';

@NgModule({
  imports: [BlackcvSharedModule, RouterModule.forChild(cVRoute)],
  declarations: [CVComponent, CVDetailComponent, CVUpdateComponent, CVDeleteDialogComponent],
  entryComponents: [CVDeleteDialogComponent]
})
export class BlackcvCVModule {}
