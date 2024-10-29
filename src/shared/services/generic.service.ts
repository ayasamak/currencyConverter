import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
accessKey='fb3017b4ee5a6237fb01633a28b10c67'
rates:any
  constructor(public http:HttpClient) { 
    this.getLatest()
  }

  getConversionRate(from: string, to: string): number {
     const rates: { [key: string]: number } = {
      'USD': 1,
      'EUR': 0.85,
      'GBP': 0.75,
      'JPY': 110
    };
    return rates[to] / rates[from];
  }

  getLatest(base='USD',symbols = ['USD', 'EUR', 'GBP', 'JPY']){
   this.http.get(`${environment.Apiurl}latest?access_key=${this.accessKey}& symbols=${symbols}`).subscribe((res:any)=>{
    this.rates=res.rates
    
   })
  }
}
