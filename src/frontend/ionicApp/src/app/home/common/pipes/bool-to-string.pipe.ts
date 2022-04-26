import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolToString'
})
export class BoolToStringPipe implements PipeTransform {

  transform(value: boolean, strIfTrue?: string, strIfFalse?: string, moreText?: string): string {
    if(value === true) {
      return ((strIfTrue) ? strIfTrue : 'TRUE') + ((moreText) ? ' ' + moreText : '');
    } else {
      return ((strIfFalse) ? strIfFalse : 'FALSE') + ((moreText) ? ' ' + moreText : '');;
    }
  }

}
