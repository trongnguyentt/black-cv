import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ValidatePhone(listPhone: any[]): ValidatorFn {
  console.log('listPhone:' + listPhone);
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    for (let i = 0; i < listPhone.length; i++) {
      if (listPhone[i] == control.value && listPhone[i] != null) {
        return { phone: true };
      }
    }
    return null;
  };
}
