import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlackcvSharedModule } from 'app/shared/shared.module';
import { CVComponent } from './cv.component';
import { CVDetailComponent } from './cv-detail.component';
import { CVUpdateComponent } from './cv-update.component';
import { CVDeleteDialogComponent } from './cv-delete-dialog.component';
import { cVRoute } from './cv.route';
import { CvNoResultComponent } from 'app/entities/cv/cv-no-result.component';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CvListResultComponent } from 'app/entities/cv/cv-list-result.component';
import { GetLengthPipe, ReplacePipe } from 'app/entities/cv/replaceCharacter.directives';

@NgModule({
  imports: [BlackcvSharedModule, RouterModule.forChild(cVRoute), MultiSelectModule, NgMultiSelectDropDownModule],
  declarations: [
    GetLengthPipe,
    ReplacePipe,
    CVComponent,
    CVDetailComponent,
    CVUpdateComponent,
    CVDeleteDialogComponent,
    CvNoResultComponent,
    CvListResultComponent
  ],
  entryComponents: [CVDeleteDialogComponent],
  exports: [CvListResultComponent]
})
export class BlackcvCVModule {}
