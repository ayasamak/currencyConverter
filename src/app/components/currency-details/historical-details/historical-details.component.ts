import { Component, OnInit } from '@angular/core';
import { CurrencyServiceService } from '../currency-service.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-historical-details',
  templateUrl: './historical-details.component.html',
  styleUrls: ['./historical-details.component.scss']
})
export class HistoricalDetailsComponent implements OnInit {
  selectedCurrency: string = 'EUR'; 
  historicalData: any = {};
  fromConversions: any = {};
  toConversions: any = {};
  predefinedCurrencies: string[] = ['USD', 'GBP', 'JPY'];

  constructor(private currencyService: CurrencyServiceService) {}

  ngOnInit(): void {
    this.fetchHistoricalData();
    this.fetchConversionRates();
  }

  fetchHistoricalData() {
    let observables:Observable<any>[]=[]
    observables.push(this.currencyService.getHistoricalData('year')),
    observables.push(this.currencyService.getHistoricalData('month')),
    observables.push(this.currencyService.getHistoricalData('day')),
    forkJoin(observables).subscribe(
      ([yearData, monthData, dayData]) => {
        this.historicalData = {
          year: yearData,
          month: monthData,
          day: dayData,
        };
      },
      (error) => {
        console.error('Error fetching historical data', error);
      }
    );
  }
  fetchConversionRates() {
    this.currencyService.getConversionRates().subscribe(data => {
      this.fromConversions = data.from;
      this.toConversions = data.to;
    });
  }
}
