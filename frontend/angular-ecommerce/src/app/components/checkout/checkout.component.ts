import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

   checkoutFormGroup!: FormGroup; 


   totalPrice:number =0;
   totalQuantity:number =0;


  constructor(private formBuilder: FormBuilder,
              
  ){}

  ngOnInit(){
   
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:['']
      }),
      shippingAdress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
        }),
        billingAdress: this.formBuilder.group({
          street:[''],
          city:[''],
          state:[''],
          country:[''],
          zipCode:['']
          }),
         creditCartd: this.formBuilder.group({
            cartType:[''],
            nameOnCard:[''],
            cardNumber:[''],
            securityCode:[''],
            expirationMonth:[''],
            expirationYear:['']
            })
    })
  }
  copyShippingAddressToBilllingAddress(event:any){
    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAdress']
          .setValue(this.checkoutFormGroup.controls['shippingAdress'].value);
    }
    else{
      this.checkoutFormGroup.controls['billingAdress'].reset();
    }
  }
  onSubmit(){
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')?.value)
  }
  
}
