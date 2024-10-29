import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CurrencyConverterComponent } from 'src/shared/components/currency-converter/currency-converter.component';
import { GenericService } from 'src/shared/services/generic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quickConversionsFrom: { amount: number; converted: number }[] = [];
  quickConversionsTo: { amount: number; converted: number }[] = [];
  constantAmounts: number[] = [10, 50, 100, 200]; 
  conversionData:{ fromCurrency: string, toCurrency: string}={
    fromCurrency: 'USD', toCurrency: 'EUR'
  }
  constructor(private genericService:GenericService) { }

  ngOnInit(): void {this.calculateQuickConversions()}
  handleConversionData(data: { fromCurrency: string; toCurrency: string}) {
    this.conversionData = data; 
    this.calculateQuickConversions()
  }

  calculateQuickConversions() {
    const fromCurrency =this.conversionData?.fromCurrency ;
    const toCurrency =this.conversionData?.toCurrency;

    this.quickConversionsFrom = this.constantAmounts.map(amount => ({
      amount,
      converted: amount * this.genericService.getConversionRate(fromCurrency, toCurrency)
    }));

    this.quickConversionsTo = this.constantAmounts.map(amount => ({
      amount,
      converted: amount * this.genericService.getConversionRate(toCurrency, fromCurrency)
    }));
  }

}
