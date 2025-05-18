import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filesize' })
export class FileSizePipe implements PipeTransform {
  transform(size: number | null | undefined): string {
    if (size === null || size === undefined) {
      return '0 MB';
    }
    return size > 1000 ? (size / 1000).toFixed(1) + ' GB' : size + ' MB';
  }
}
