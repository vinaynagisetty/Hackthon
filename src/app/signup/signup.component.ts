import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
    private As:AuthService
    ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
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
    this.As.signUp(user).subscribe(response => {
      console.log('User registered:', response);
      this.router.navigate(['/login']);
    });
  }
}
