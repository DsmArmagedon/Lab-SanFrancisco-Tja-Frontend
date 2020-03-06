import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  convertDateToString(date: Date): string {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
   }  
 
   convertStringToDate(date: string): Date {
     let dateArray = date.split('-');
     let dateArrayNumber = dateArray.map( (e) => parseInt(e));
     return new Date(dateArrayNumber[2],dateArrayNumber[1]-1,dateArrayNumber[0]);
   }

   valUpdateDeleteForDate(date_expense: string): boolean{
    let dateExpense = date_expense.split('-');
    let dateToday: Date = new Date;
    let month: number = dateToday.getMonth() + 1;
    let year: number = dateToday.getFullYear();
    let monthExpense: number = parseInt(dateExpense[1]);
    let yearExpense: number = parseInt(dateExpense[2]);
    if(monthExpense == 12) {
      monthExpense = 0;
      year--;
    }
    if(year == yearExpense) {
      if(month == monthExpense || month == monthExpense + 1) {
        return true;
      }
    }
    return false;
   }
}
