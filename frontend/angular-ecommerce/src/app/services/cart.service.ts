import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  cartItems : CartItem[]=[];

  totalPrice: Subject<number> =new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> =new BehaviorSubject<number>(0);


  constructor() { }

  addToCart(theCartItem :CartItem){
    //check if we already have the item in our cart
    let alreadyExistsInCart:boolean=false;
    let existingCartItem1: CartItem|undefined=new CartItem(new Product(0,"","","",0,"",false,0));
    let  existingCartItem2 :CartItem|undefined;
    if(this.cartItems.length>0){

    
    //find the item in the cart based on ityem id

    for(let tempCartItem of this.cartItems){
      if(tempCartItem.id===theCartItem.id){
        existingCartItem1=tempCartItem
        existingCartItem2=existingCartItem1;
      }
    }
      }
    //check if we found it
    alreadyExistsInCart=(existingCartItem1==existingCartItem2);

    if(alreadyExistsInCart&&alreadyExistsInCart){
      //increment the quantity
      existingCartItem1.quantity++;
    }
    else{
      //just add the item to the array
      this.cartItems.push(theCartItem);
    }

    //compute cart total price and total quantity
    this.computeCartTotals();
  }
  computeCartTotals() {
    

    let totalPriceValue: number =0;
    let totalQuanttityValue: number =0;

    for(let currentCartItem of this.cartItems){
     totalPriceValue+=currentCartItem.quantity*currentCartItem.unitPrice;
     totalQuanttityValue+=currentCartItem.quantity;
    }

    //publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuanttityValue);

    //log cart data just for debugging purposes
    this.logCartData(totalPriceValue,totalQuanttityValue);
  }
  logCartData(totalPriceValue: number, totalQuanttityValue: number) {
    console.log('Contents of the cart');
    for(let tempCartItem of this.cartItems){
      const subtottalPrice=tempCartItem.quantity*tempCartItem.unitPrice;
      console.log(`name:${tempCartItem.name},quantity=${tempCartItem.quantity},unitPrice=${tempCartItem.unitPrice},subTotalPrice:${subtottalPrice}`);
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity:${totalQuanttityValue}`);
    console.log('---');
  }
  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if(theCartItem.quantity==0){
      this.remove(theCartItem);
    }
    else{
      this.computeCartTotals();
    }
  }
  remove(theCartItem: CartItem) {
    //get index of item in the array
    const itemIndex =this.cartItems.findIndex( tempCartItem => tempCartItem.id===theCartItem.id);

    //if found, remove the item the array at the given index
    if (itemIndex >-1){
      this.cartItems.splice(itemIndex , 1);

      this.computeCartTotals();
    }
  }

}
