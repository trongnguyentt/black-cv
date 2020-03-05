import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlackcvSharedModule } from 'app/shared/shared.module';
import { CVComponent } from './cv.component';
import { CVDetailComponent } from './cv-detail.component';
import { CVUpdateComponent } from './cv-update.component';
import { CVDeleteDialogComponent } from './cv-delete-dialog.component';
import { cVRoute } from './cv.route';
import { CvNoResultlComponent } from 'app/entities/cv/cv-no-resultl.component';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {CvListResultlComponent} from "app/entities/cv/cv-list-resultl.component";
@NgModule({
  imports: [BlackcvSharedModule, RouterModule.forChild(cVRoute), MultiSelectModule, NgMultiSelectDropDownModule],
  declarations: [CVComponent, CVDetailComponent, CVUpdateComponent, CVDeleteDialogComponent, CvNoResultlComponent, CvListResultlComponent],
  exports: [
    CvListResultlComponent
  ],

  entryComponents: [CVDeleteDialogComponent]
})
export class BlackcvCVModule {}
