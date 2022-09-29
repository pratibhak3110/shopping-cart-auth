import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Productclass } from '../product.module';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  totalCartItem: number= 0;
  product!: Array<Productclass>;
  productClass!:Productclass[];
  grandTotal: number= 0;
  count: number= 0;
  totalAmount!: number;
  laptopArray: number[]= [];
  setTotal: any;

  constructor(
    private shopCartService: ShoppingCartService,
    private router: Router
    ){
    this.product= Array<Productclass>();
  }

  ngOnInit(): void {
    this.shopCartService.getCartLaptops().subscribe( response => {
      this.totalCartItem = response.length;

      this.product= response;

      this.getGrandTotal();
  })
  }

  addToCart(item: Productclass){
    let productExists= false;
 
    for(let index in this.product){
      if(this.product[index].id === item.id){
        this.product[index].quantity++;
        productExists= true;
        break;
      }
    }
 
    if(!productExists){
     this.shopCartService.addToCart(item);
    }
     
   }


  getGrandTotal(){
    this.grandTotal= this.product.map(x => x.total == null ? 0 : x.total).reduce((prev, next) =>
       prev + next, 0
       )
  }

  emptyCart(){
    this.shopCartService.emptyCart();
    console.log("Cart is empty");
  }

  increment(item: number){
    if(this.product[item].quantity != 5){
      this.product[item].quantity= this.product[item].quantity + 1;
      this.product[item].total = this.product[item].quantity * this.product[item].price;
      console.log(this.product);
      this.getGrandTotal();
    }
  }

  decrement(item: any){
    if(this.product[item].quantity != 1){
    this.product[item].quantity= this.product[item].quantity - 1;
    this.product[item].total = this.product[item].quantity * this.product[item].price;
    console.log(this.product);
    this.getGrandTotal();
    }
  }

  redirectToBilling(){
    this.router.navigate(['/billing']);
  }

}
