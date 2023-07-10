import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'circularSlice'
})
export class CircularSlicePipe implements PipeTransform {
  transform<T>(value: T[], index: number = 0, size: number= 1): T[] | null {
    if (!value || size <= 0) {
      return null;
    }

    const start = index % value.length;
    const end = (start + size) % value.length;

    if (end < start) {
      return [...value.slice(start), ...value.slice(0, end)];
    } else {
      return value.slice(start, end);
    }
  }
}
