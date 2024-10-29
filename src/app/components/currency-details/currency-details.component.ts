import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-currency-details',
  templateUrl: './currency-details.component.html',
  styleUrls: ['./currency-details.component.scss']
})
export class CurrencyDetailsComponent implements OnInit {
  fromCurrency: string='';
  toCurrency: string='';
  fromCurrencyName: string='';
  toCurrencyName: string='';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fromCurrency = this.route.snapshot.queryParamMap.get('fromCurrency') || '';
    this.toCurrency = this.route.snapshot.queryParamMap.get('toCurrency') || '';

    this.fromCurrencyName = this.getCurrencyFullName(this.fromCurrency);
    this.toCurrencyName = this.getCurrencyFullName(this.toCurrency);
  }

  getCurrencyFullName(currency: string): string {
    const currencyNames:any = {
      USD: 'United States Dollar',
      EUR: 'Euro',
      GBP: 'British Pound Sterling',
      JPY: 'Japanese Yen',
      AUD: 'Australian Dollar',
    };
    return currencyNames[currency] || currency;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}