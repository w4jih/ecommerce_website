import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{


   checkoutFormGroup!: FormGroup; 


   totalPrice:number =0;
   totalQuantity:number =0;


creditCardYears : number[]=[];
creditCardMonths : number[]=[];
  constructor(private formBuilder: FormBuilder,
              private luv2ShopFormService : Luv2ShopFormService
              
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
         creditCard: this.formBuilder.group({
            cardType:[''],
            nameOnCard:[''],
            cardNumber:[''],
            securityCode:[''],
            expirationMonth:[''],
            expirationYear:['']
            })
    })

    // populate credit card months

    const startMonth : number = new Date().getMonth()+1;
    console.log("startMonth " +startMonth);

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: "+JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    //populate credit card years

    this.luv2ShopFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years: "+JSON.stringify(data));
        this.creditCardYears=data;
      }
    )
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
  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number =new Date().getFullYear();
    const selectedYear: number =Number(creditCardFormGroup?.value.expirationYear);

    //if the current year equals the selected year, then start the current month

    let startMonth: number ;

    if(currentYear === selectedYear){
      startMonth = new Date().getMonth()+1;
    }
    else{
      startMonth = 1;
    }

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data =>{
        console.log("Retrievs credit card months :" +JSON.stringify(data));
        this.creditCardMonths=data;
      }
    )
  }
}
