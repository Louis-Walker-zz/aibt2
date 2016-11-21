import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'answer'
})
export class AnswerPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value ? "Yes" : "No";
  }

}
