import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Luv2ShopFormService } from '../../services/luv2-shop-form.service';
import { Country } from '../../common/country';
import { State } from '../../common/state';



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

countries :Country[]=[];

shippingAddressStates: State[]=[];
billingAddessStates: State[]=[];

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
      shippingAddress: this.formBuilder.group({
        street:[''],
        city:[''],
        state:[''],
        country:[''],
        zipCode:['']
        }),
        billingAddress: this.formBuilder.group({
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
    );

    //populate the countries
    this.luv2ShopFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    );

    
  }
  copyShippingAddressToBilllingAddress(event:any){
    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAddress']
          .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

          //bug fix for states
          this.billingAddessStates = this.shippingAddressStates;
    }
    else{
      this.checkoutFormGroup.controls['billingAddress'].reset();

      //bug fix for states
      this.billingAddessStates=[];
    }
  }
  onSubmit(){
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')?.value)
    console.log("the email address is "+this.checkoutFormGroup.get('customer')?.value.email);

    console.log("the email address is "+this.checkoutFormGroup.get('customer')?.value.country.name);
    console.log("the email address is "+this.checkoutFormGroup.get('customer')?.value.state.name);


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
  getStates(formGroupName: string) {
   
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.luv2ShopFormService.getStates(countryCode).subscribe(
      data => {

        if (formGroupName==='shippingAddress'){
          this.shippingAddressStates=data
          
        }
        else{
          this.billingAddessStates=data;
        }

        // select first item by default
        formGroup?.get('state')?.setValue(data[0]);
        console.log('shippingstates');
        console.table(data); 
      }
      
    )

      }

      
     }
    

    

