import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { GenericService } from 'src/shared/services/generic.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockGenericService = jasmine.createSpyObj('GenericService', ['getConversionRate']);

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [{ provide: GenericService, useValue: mockGenericService }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate quick conversions correctly', () => {
    component.conversionData = {
      fromCurrency: 'USD',
      toCurrency: 'EUR',
    };
    component.constantAmounts = [10, 20, 50];
    mockGenericService.getConversionRate.and.callFake((from: string, to: string) => {
      if (from === 'USD' && to === 'EUR') return 0.85; 
      if (from === 'EUR' && to === 'USD') return 1.18; 
      return 1; 
    });
    component.calculateQuickConversions();

    expect(component.quickConversionsFrom).toEqual([
      { amount: 10, converted: 8.5 },
      { amount: 20, converted: 17 },
      { amount: 50, converted: 42.5 },
    ]);

    expect(component.quickConversionsTo).toEqual([
      { amount: 10, converted: 11.8 },
      { amount: 20, converted: 23.6 },
      { amount: 50, converted: 59 },
    ]);
  });
});
