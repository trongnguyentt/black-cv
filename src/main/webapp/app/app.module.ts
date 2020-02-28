import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { BlackcvSharedModule } from 'app/shared/shared.module';
import { BlackcvCoreModule } from 'app/core/core.module';
import { BlackcvAppRoutingModule } from './app-routing.module';
import { BlackcvHomeModule } from './home/home.module';
import { BlackcvEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { SearchcvComponent } from './full-image/searchcv.component';
import { SearchcvModule } from 'app/full-image/searchcv.module';
import { ListReportComponent } from './list-report/list-report.component';

@NgModule({
  imports: [
    BrowserModule,
    BlackcvSharedModule,
    BlackcvCoreModule,
    BlackcvHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    SearchcvModule,
    BlackcvEntityModule,
    BlackcvAppRoutingModule
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    SearchcvComponent,
    ListReportComponent,
  ],
  bootstrap: [MainComponent]
})
export class BlackcvAppModule {}
