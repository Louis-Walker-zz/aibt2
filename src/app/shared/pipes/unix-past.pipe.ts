import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixPast'
})
export class UnixPastPipe implements PipeTransform {
  transform( value: number ): string {
    const units: Array<string> = ['seconds', 'minutes', 'hours', 'days', 'weeks'];
    let seconds = ( Date.now() - value ) / 1000;
    let unitsIndex = 0;

    // Refactor into reverse iteration
    if (seconds < 3600) {
      unitsIndex = 1;
      seconds /= 60;
    } else if (seconds < 86400) {
      unitsIndex = 2;
      seconds /= 3600;
    } else if (seconds < 604800) {
      unitsIndex = 3;
      seconds /= 86400;
    } else {
      unitsIndex = 4;
      seconds /= 604800;
    }

    return `${ Math.floor(seconds) } ${ units[unitsIndex] } ago`;
  }
}
