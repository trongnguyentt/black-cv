import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempConverter'
})
export class ReplacePipe implements PipeTransform {
  transform(value: string) {
    const re = /,/gi;
    return value.replace(re, '<br>');
  }
}
