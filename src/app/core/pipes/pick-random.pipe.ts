import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pickRandom'
})
export class PickRandomPipe implements PipeTransform {
  transform<T>(value: T[]): T | null | undefined {
    if (!value || value.length === 0) {
      return null;
    }

    return value.at(Math.floor(Math.random() * value.length));
  }
}
