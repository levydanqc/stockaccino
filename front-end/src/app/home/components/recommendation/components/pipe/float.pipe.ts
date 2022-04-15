import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'float',
})
export class FloatPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: number): string {
    if (Math.abs(value) > 1e5 || Math.abs(value) < 1e-5) {
      return value.toExponential(3);
    } else {
      return this.decimalPipe.transform(value, '1.2-5')!;
    }
  }
}
