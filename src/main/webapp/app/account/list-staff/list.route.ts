import { Route } from '@angular/router';
import { ListStaffComponent } from 'app/account/list-staff/list.component';

export const listRoute: Route = {
  path: 'list-staff',
  component: ListStaffComponent
  // outlet: 'navbar'
};
