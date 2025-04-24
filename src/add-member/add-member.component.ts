// customer-form.component.ts
import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { Router } from '@angular/router'; // Add this import

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {AddMemberService} from "./add-member.service";
export enum Country {
  BD = 'BD',
  INDIA = 'INDIA',
  USA = 'USA',
  UK = 'UK',
  CANADA = 'CANADA',
  AUSTRALIA = 'AUSTRALIA',
  GERMANY = 'GERMANY',
  FRANCE = 'FRANCE'
}

@Component({
  selector: 'app-customer-form',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class CustomerFormComponent {
  customerForm: FormGroup;
  countries = Object.values(Country);
  imagePreview: string | ArrayBuffer | null = null;
  imageFile: File | null = null;
  cvFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private customerService: AddMemberService,
    private router: Router,
  ) {
    this.customerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      additionalInfo: this.fb.array([], { validators: this.atLeastOneField })
    });
  }

  // // Custom validator for at least one additional field
  // atLeastOneField = (control: FormArray): { [key: string]: boolean } | null => {
  //   const values = control.value;
  //   if (values.length === 0) return { 'required': true };
  //   for (let field of values) {
  //     if (field.key && field.value) return null;
  //   }
  //   return { 'required': true };
  // }

  get additionalInfo(): FormArray {
    return this.customerForm.get('additionalInfo') as FormArray;
  }

  // Modified file handlers
  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imageFile = input.files[0];
      // ... existing preview code ...
    }
  }

  onCvSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.cvFile = input.files[0];
    }
  }

  atLeastOneField: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const formArray = control as FormArray;
    if (formArray.length === 0) return { 'required': true };

    for (let field of formArray.controls) {
      const key = field.get('key')?.value;
      const value = field.get('value')?.value;
      if (key && value) return null;
    }
    return { 'required': true };
  }

// In your component class
  addAdditionalField(): void {
    const newField = this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required]
    });
    this.additionalInfo.push(newField);
    this.customerForm.updateValueAndValidity();
  }



  removeAdditionalField(index: number): void {
    this.additionalInfo.removeAt(index);
    this.customerForm.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.customerForm.valid && this.imageFile && this.cvFile) {
      const formData = new FormData();

      // Basic info
      formData.append('username', this.customerForm.value.username);
      formData.append('phone', this.customerForm.value.phone);
      formData.append('email', this.customerForm.value.email);
      formData.append('country', this.customerForm.value.country);

      // Additional info
      const additionalInfo = this.customerForm.value.additionalInfo
        .reduce((acc: any, curr: any) => {
          if (curr.key && curr.value) acc[curr.key] = curr.value;
          return acc;
        }, {});
      formData.append('additionalInfo', JSON.stringify(additionalInfo));

      // Files
      formData.append('image', this.imageFile);
      formData.append('cv', this.cvFile);

      // Send to service
      this.customerService.createCustomer(formData).subscribe({
        next: (response: any) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/member-list']); // Add navigation
          console.log('Customer created:', response);
          // Reset form
          this.customerForm.reset();
          this.imageFile = null;
          this.cvFile = null;
          this.imagePreview = null;
          this.additionalInfo.clear();
        },
        error: (err: any) => {
          console.error('Error creating customer:', err);
        }
      });
    }
  }
}
