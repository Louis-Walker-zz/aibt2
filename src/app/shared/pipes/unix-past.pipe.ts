import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixPast'
})
export class UnixPastPipe implements PipeTransform {
  transform( value: number ): string {
    const units: Array<string> = ["seconds", "minutes", "hours", "days"];

    let seconds: number = ( Date.now() - value ) / 1000;

    let unitsIndex: number = 0;
    while( seconds > 60 || ( unitsIndex >= 2 && seconds > 24 ) ) {
      unitsIndex++;

      unitsIndex >= 2 ?
        seconds = seconds / 24
      : seconds = seconds / 60;
    }

    return `${ Math.floor(seconds) } ${ units[unitsIndex] } ago`;
  }
}