import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filesize' })
export class FileSizePipe implements PipeTransform {
  transform(size: number): string {
    return size > 1000 ? (size / 1000).toFixed(1) + ' GB' : size + ' MB';
  }
}
