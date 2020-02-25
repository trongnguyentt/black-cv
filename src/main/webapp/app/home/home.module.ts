import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlackcvSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [BlackcvSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class BlackcvHomeModule {}
