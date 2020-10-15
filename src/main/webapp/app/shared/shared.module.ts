import { NgModule } from '@angular/core';
import { BlackcvSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { LoginModalComponent } from 'app/shared/login/login.component';

@NgModule({
  imports: [BlackcvSharedLibsModule],
  declarations: [FindLanguageFromKeyPipe, AlertComponent, AlertErrorComponent, HasAnyAuthorityDirective, LoginModalComponent],
  entryComponents: [LoginModalComponent],
  exports: [
    BlackcvSharedLibsModule,
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    LoginModalComponent
  ]
})
export class BlackcvSharedModule {}
