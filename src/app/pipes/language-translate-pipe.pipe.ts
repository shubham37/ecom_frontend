import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'languageTranslatePipe'
})
export class LanguageTranslatePipePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let lang = localStorage.getItem('locale');
    if (lang == 'EN') {
      return value + "E";
    } else {
      return value + "O";
    }
  }

}
