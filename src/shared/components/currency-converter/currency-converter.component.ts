import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericService } from 'src/shared/services/generic.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent  {
  converterForm: FormGroup;
  convertedAmount: number | null = null;
  amount:number=0
  fromCurrency:string=''
  currencies: string[] = ['USD', 'EUR', 'GBP', 'JPY']; 
  @Input() inputDisable:boolean=false
  @Output() currencyChange = new EventEmitter<{ fromCurrency: string, toCurrency: string, amount: number }>();

  constructor(private fb: FormBuilder, public router: Router,private genericService:GenericService) {
    this.converterForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0)]],
      fromCurrency: [{ value: 'EUR', disabled: true }, Validators.required],
      toCurrency: [{ value: 'USD', disabled: true }, Validators.required]
    });

    // Enable the currency dropdowns when the amount is valid
    this.converterForm.get('amount')?.valueChanges.subscribe(value => {
      if (this.converterForm.get('amount')?.valid && !this.inputDisable) {
        this.converterForm.get('fromCurrency')?.enable();
        this.converterForm.get('toCurrency')?.enable();
      } else {
        this.converterForm.get('fromCurrency')?.disable();
        this.converterForm.get('toCurrency')?.disable();
      }
    });

    // Listen for changes in the currency dropdowns
    this.converterForm.get('fromCurrency')?.valueChanges.subscribe(() => {
    this.convert()
    });

    this.converterForm.get('toCurrency')?.valueChanges.subscribe(() => {
    this.convert()
    });
  }

  swapCurrencies() {
    const from = this.converterForm.get('fromCurrency')!.value;
    const to = this.converterForm.get('toCurrency')!.value;
    this.converterForm.patchValue({
      fromCurrency: to,
      toCurrency: from
    });
   this.convert()

  }

  onConvert() {
    const { fromCurrency, toCurrency, amount } = this.converterForm.getRawValue();
    const conversionRate = this.genericService.getConversionRate(fromCurrency, toCurrency);
    this.convertedAmount = amount * conversionRate;
    this.amount=amount
    this.fromCurrency=fromCurrency
    this.convert()

  }

  goToDetails() {
    const fromCurrency = this.converterForm.get('fromCurrency')!.value.toLowerCase();
    this.router.navigate([`${fromCurrency}-details`]);
  }

  convert() {
    const { fromCurrency, toCurrency, amount } = this.converterForm.getRawValue();
    this.currencyChange.emit({ fromCurrency, toCurrency, amount });
  }
}