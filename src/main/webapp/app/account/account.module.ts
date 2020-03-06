import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlackcvSharedModule } from 'app/shared/shared.module';

import { PasswordStrengthBarComponent } from './password/password-strength-bar.component';
import { RegisterComponent } from './register/register.component';
import { ActivateComponent } from './activate/activate.component';
import { PasswordComponent } from './password/password.component';
import { PasswordResetInitComponent } from './password-reset/init/password-reset-init.component';
import { PasswordResetFinishComponent } from './password-reset/finish/password-reset-finish.component';
import { SettingsComponent } from './settings/settings.component';
import { accountState } from './account.route';
import { SendCvComponent } from 'app/account/send-cv/send-cv.component';
import { LoginModalComponent } from 'app/account/login/login.component';
import { ListStaffComponent } from 'app/account/list-staff/list.component';

@NgModule({
  imports: [BlackcvSharedModule, RouterModule.forChild(accountState)],
  declarations: [
    ActivateComponent,
    RegisterComponent,
    PasswordComponent,
    PasswordStrengthBarComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    SettingsComponent,
    SendCvComponent,
    ListStaffComponent,
    LoginModalComponent
  ]
})
export class AccountModule {}
