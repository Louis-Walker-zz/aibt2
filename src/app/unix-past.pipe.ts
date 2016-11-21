import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixPast'
})
export class UnixPastPipe implements PipeTransform {
  transform( value: number ): string {
    let seconds: number = ( Date.now() - value ) / 1000;

    return this.unitFormat( seconds );
  }

  unitFormat( t ): any {
    let unitsIndex = 0;
    let units = ["seconds", "minutes", "hours", "days"];

    while( t > 60 ) {
      unitsIndex++;
      t = t / 60;
    }

    return `${ Math.floor(t) } ${ units[unitsIndex] } ago`;
  }
}