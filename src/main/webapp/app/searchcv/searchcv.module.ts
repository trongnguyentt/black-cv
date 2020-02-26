import { NgModule } from '@angular/core';
import { BlackcvSharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { searchRoute } from 'app/searchcv/searchcv.route';

@NgModule({
  imports: [BlackcvSharedModule, RouterModule.forChild(searchRoute)],
  declarations: [],
  entryComponents: []
})
export class SearchcvModule {}
