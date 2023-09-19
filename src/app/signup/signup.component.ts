import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';
import {confirmPasswordValidator} from '.././comparepassword'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService]
})
export class SignupComponent implements OnInit {
  public form!: UntypedFormGroup;
  public isSubmit=false;
  private emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public defaultEmailDomain: string = ''; 
  private password=/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  constructor(private fb: FormBuilder,
    private router: Router,
    private As:AuthService,
    private messageService: MessageService
    ) {}

  ngOnInit(): void {
  this.buildForm();
  }
  
  buildForm() {
    this.form = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      mobile_no: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      company_name: [null, [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(this.password)]],
      confirm_password: ['', [Validators.required]],
      date_of_birth: ['', Validators.required],
    }, { validators: confirmPasswordValidator });
  }

  

  // signUp(): void {
  //   if (this.form.valid) {
  //     const userData = this.form.value;
  //     // Perform sign-up action using userData
  //     this.As.signUp.
  //     console.log('Sign Up Data:', userData);

  //   }
  // }
  selectCompany(event: any) {
    const selectedCompany = event.target.value;
    if (selectedCompany === 'Nstarx') {
      this.defaultEmailDomain = '@nstarxinc.com';
    } else {
      this.defaultEmailDomain = ''; // Reset to empty string for other companies
    }
  }
  signUp(user: any): void {
    this.isSubmit=true;
    console.log(user);
    console.log(this.form);
    let dataparams={
      
    }
    
    if(this.form.valid){

      this.As.signUp(user).subscribe(response => {
        console.log('User registered:', response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User register succesfully' });

        this.router.navigate(['/login']);
      });
    }
    else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Fill the all mandatory fields to continue' });

    }
    
    
  }
}
