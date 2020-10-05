import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  valUpdateDeleteForDate(date_resource: Moment): boolean {
    const dateToday: Moment = moment();
    const dateFirst: Moment = dateToday.clone().subtract(1, 'month').startOf('month');
    if (dateToday.diff(date_resource, 'day') < dateToday.diff(dateFirst, 'day')) {
      return true;
    }
    return false;
  }

  valShowResourceOfDate(resource: any, date: string): any {
    return resource.map((model: any) =>
      model['show'] = this.valUpdateDeleteForDate(model[date])
    )
  }
}
