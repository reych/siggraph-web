import { Pipe, PipeTransform } from '@angular/core';
/* Reverses the order that an array prints out in an *ngFor statement.
 * Usage:
 *    *ngFor = "<value> of <array> | reverse"
 * Example:
 *    *ngFor = "event of eventsArray | reverse"

*/
@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {
  transform(value) {
    return value.slice().reverse();
  }
}
