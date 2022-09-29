import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BillingInformation } from '../billing.module';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  public laptopUrl= "http://localhost:3000/laptops/";
  cartItemList: string[] = [];
  laptopList= new BehaviorSubject<any>([]);
  //we can emit a data or it also act as observable where it subscribe to data when data is emitted
  search= new BehaviorSubject<string>("");
  sort= new BehaviorSubject<string>("");

  billingInfoArr: BillingInformation[]=[];
  
  constructor(
    private http: HttpClient
  ) { }

  getLaptops(): Observable<any>{
    return this.http.get(this.laptopUrl)
    .pipe(map((response : any) =>{
      return response;
    }));
  }

  getCartLaptops(){
    return this.laptopList.asObservable();
  }

  setCartLaptop(laptop: any){
    this.cartItemList.push(laptop); 
    this.laptopList.next(laptop);
  }
  

  addToCart(laptop: any){
    this.cartItemList.push(laptop);
    this.laptopList.next(this.cartItemList);
    this.getTotalAmount();
    console.log(this.cartItemList)
  }

  getTotalAmount(): number{
    let total= 0;
    this.cartItemList.map((item: any) =>{
      total = total + item.total;
    });
    return total;
  }

  emptyCart(){
    this.cartItemList = [];
    this.laptopList.next(this.cartItemList);
  }

  addAddress(info: BillingInformation){
    let resultStr= '';
    let userLength= this.billingInfoArr.length;
    let newLength= this.billingInfoArr.push(info);
    if(newLength > userLength){
      resultStr= "Success";
    }
    else{
      resultStr=  "Fail";
    }
    return resultStr;
  }

  getBillingInfo(){
    console.log("billing info is " + this.billingInfoArr);
   return this.billingInfoArr;
  
  }
}
