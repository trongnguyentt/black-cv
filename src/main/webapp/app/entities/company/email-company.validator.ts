import { AbstractControl } from '@angular/forms';

export function ValidatorsEmail(control: AbstractControl): { [key: string]: any } | null {
  let arr = [
    'mail.com',
    'gmail.com',
    'google.com',
    'googlemail.com',

    'outlook.com',

    'icloud.com',

    'aol.com',

    'hotmail.com',
    'hotmail.co.uk',
    'hotmail.fr',
    'hotmail.it',

    'msn.com',
    'wanadoo.fr',

    'yahoo.com',
    'yahoo.fr',
    'yahoo.co.uk',
    'yahoo.com.br',
    'yahoo.co.in',
    'ymail.com',

    'live.com',
    'live.fr',
    'live.co.uk'
  ];

  for (let i = 0; i < arr.length; i++) {
    if (control.value.toString().includes(arr[i])) {
      return { emailInvalid: true };
    }
  }
  return null;
}
