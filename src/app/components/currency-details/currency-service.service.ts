import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyServiceService {

  constructor() { }

  getHistoricalData(filter:string): Observable<any> {
    const fakeData:any = {
      year: {
        '2023-01-01': 1.0,
        '2023-02-01': 1.02,
        '2023-03-01': 1.05,
        '2023-04-01': 1.03,
        '2023-05-01': 1.07,
        '2023-06-01': 1.01,
        '2023-07-01': 1.04,
        '2023-08-01': 1.06,
        '2023-09-01': 1.02,
        '2023-10-01': 1.05,
      },
      month: {
        '2023-10-01': 1.05,
        '2023-10-02': 1.04,
        '2023-10-03': 1.06,
        '2023-10-04': 1.07,
        '2023-10-05': 1.02,
        '2023-10-06': 1.03,
        '2023-10-07': 1.05,
      },
      day: {
        '2023-10-27': 1.04,
        '2023-10-28': 1.05,
        '2023-10-29': 1.03,
      },
    };

    return of(fakeData[filter]);
  }

  getConversionRates(): Observable<any> {
    const fakeConversionData = {
      from: {
        USD: 0.85,
        GBP: 0.75,
        JPY: 110.0,
      },
      to: {
        USD: 1.0,
        GBP: 0.85,
        JPY: 0.75,
      },
    };

    return of(fakeConversionData);
  }
}
