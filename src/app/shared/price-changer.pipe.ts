import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceChanger'
})
export class PriceChangerPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
