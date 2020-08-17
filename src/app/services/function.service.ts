import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor() { }

  getMissingDays() {
    let date: Date = new Date;
    let days: number = date.getDate();
    date.setMonth(date.getMonth() - 1);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    return this.daysForMonth(month, year) + days - 1;
  }

  daysForMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }
}
