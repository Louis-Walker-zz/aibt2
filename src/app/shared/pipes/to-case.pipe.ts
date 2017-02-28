import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';

@Pipe({
  name: 'toCase'
})
export class ToCasePipe implements PipeTransform {

  transform( value: string, caseType = 'capitalize' ): string {

    switch ( caseType ) {
      case 'capitalize': return _.capitalize( value );
      case  'camelCase': return _.camelCase( value );
      case  'kebabCase': return _.kebabCase( value );
      case  'lowerCase': return _.lowerCase( value );
      case 'lowerFirst': return _.lowerFirst( value );
      case  'snakeCase': return _.snakeCase( value );
      case  'startCase': return _.startCase( value );
      case    'toLower': return _.toLower( value );
      case    'toUpper': return _.toUpper( value );
      case  'upperCase': return _.upperCase( value );
      case 'upperFirst': return _.upperFirst( value );
    }
  }
}
