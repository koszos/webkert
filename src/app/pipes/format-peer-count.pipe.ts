import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPeerCount',
  standalone: true
})
export class FormatPeerCountPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value)) return '0';
    
    if (value < 1000) {
      return value.toString();

    } else if (value < 1000000) {
      return (value / 1000).toFixed(1) + 'k';

    } else {
      return (value / 1000000).toFixed(1) + 'M'; // mondjuk ilyen ugyse lesz :DDD
    }
  }
}