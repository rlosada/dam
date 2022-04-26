import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase'
})
export class TitleCasePipe implements PipeTransform {

  transform(title: string): string | null {
    const separator = ' ';
    if(!title) {
      return null;
    }
    const words: string[] = title.split(separator);
    words.forEach( (word,i) => words[i] = this.titleCase(word));

    return words.join(separator);
  }

  titleCase(value: string) {
     return value[0].toUpperCase() + value.substring(1).toLowerCase();
  }

}
