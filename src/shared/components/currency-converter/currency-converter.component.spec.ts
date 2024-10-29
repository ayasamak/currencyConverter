import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConverterComponent } from './currency-converter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('CurrencyConverterComponent', () => {
  let component: CurrencyConverterComponent;
  let fixture: ComponentFixture<CurrencyConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyConverterComponent ],
      imports: [ ReactiveFormsModule, RouterTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should swap currencies correctly', () => {
    component.converterForm.patchValue({
      fromCurrency: 'USD',
      toCurrency: 'EUR'
    });
    component.swapCurrencies();
    expect(component.converterForm.get('fromCurrency')!.value).toBe('EUR');
    expect(component.converterForm.get('toCurrency')!.value).toBe('USD');
  });

  it('should navigate to the details page', () => {
    spyOn(component.router, 'navigate');
    component.converterForm.patchValue({
      fromCurrency: 'USD'
    });
    component.goToDetails();
    expect(component.router.navigate).toHaveBeenCalledWith(['usd-details']);
  });

});
