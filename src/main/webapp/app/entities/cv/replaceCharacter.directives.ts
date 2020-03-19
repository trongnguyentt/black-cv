import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempConverter'
})
export class ReplacePipe implements PipeTransform {
  transform(value: string) {
    const re = /,/gi;
    let splitted = value.split(re);
    let d = '<div class="pb-sm-1">';
    let iv = '</div>';
    let begin = '<span class="d-none d-md-inline badge badge-pill badge-danger">';
    let end = '</span>';
    let line = '<br>';
    let result = '';
    for (let i = 0; i < splitted.length; i++) {
      result = result + d + begin + (i + 1) + end + '   ' + splitted[i] + iv + line;
    }
    return result;
  }
}

@Pipe({
  name: 'getLength'
})
export class GetLengthPipe implements PipeTransform {
  transform(value: string): number {
    let len = 1;
    for (let i = 0; i < value.length; i++) {
      if (value[i].toString() == ',') {
        len++;
      }
    }
    return len;
  }
}
