import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlackcvSharedModule } from 'app/shared/shared.module';
import { CompanyComponent } from './company.component';
import { CompanyDetailComponent } from './company-detail.component';
import { CompanyUpdateComponent } from './company-update.component';
import { CompanyDeleteDialogComponent } from './company-delete-dialog.component';
import { companyRoute } from './company.route';
import { UserCompanyComponent } from 'app/entities/company/user-company.component';

@NgModule({
  imports: [BlackcvSharedModule, RouterModule.forChild(companyRoute)],
  declarations: [UserCompanyComponent, CompanyComponent, CompanyDetailComponent, CompanyUpdateComponent, CompanyDeleteDialogComponent],
  entryComponents: [CompanyDeleteDialogComponent]
})
export class BlackcvCompanyModule {}
