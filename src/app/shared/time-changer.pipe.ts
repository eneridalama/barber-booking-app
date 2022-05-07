import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeChanger'
})
export class TimeChangerPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
