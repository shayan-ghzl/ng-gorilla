import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'byteFormat',
  standalone: true
})
export class ByteFormatPipe implements PipeTransform {

  transform(value: number, decimals?: number): unknown {
    if (value > 0) {
      return this.formatBytes(value, decimals);
    }
    return value;
  }

  private formatBytes(bytes: number, decimals?: number) {
    if (bytes === 0) {
      return '0 Byte';
    }
    const k = 1024;
    const dm = decimals || 2;
    const sizes = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

}