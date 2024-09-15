import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";

export class Luv2ShopValidators {

    // Whitespace validation
    static notOnlyWhitespace(control: AbstractControl): ValidationErrors | null {
        
        // Check if the string contains only whitespace
        if (control.value != null && control.value.trim().length === 0) {
             
            // Invalid, return error object
            return { 'notOnlyWhitespace': true };
        } 
        else {
            // Valid, return null
            return null;
        }
    }
}
