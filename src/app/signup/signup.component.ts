import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public form!: UntypedFormGroup;
  private emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private fb: FormBuilder,
    private router: Router,
    private As:AuthService
    ) {}

  ngOnInit(): void {
  this.buildForm();
  }
  buildForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      mobile: ['', [Validators.required]],
      Company: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  // signUp(): void {
  //   if (this.form.valid) {
  //     const userData = this.form.value;
  //     // Perform sign-up action using userData
  //     this.As.signUp.
  //     console.log('Sign Up Data:', userData);

  //   }
  // }

  signUp(user: any): void {
    console.log(this.form);
    if(this.form.valid){
      this.As.signUp(user).subscribe(response => {
        console.log('User registered:', response);
        this.router.navigate(['/login']);
      });
    }
    
    
  }
}
