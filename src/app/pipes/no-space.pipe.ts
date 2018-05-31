import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noSpace'
})
export class NoSpacePipe implements PipeTransform {

  transform(value: string): string {
    const newValue = value.split(' ').join('-');
    return newValue;
  }

}
