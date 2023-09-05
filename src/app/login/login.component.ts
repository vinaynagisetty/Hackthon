import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router) {
    this.form = this.fb.group({
      email: '',
      password: ''
    });
  }

  login(credentials:any): void {
    
      this.authService.login(credentials).subscribe(response => {
        console.log('Logged in:', response);
        // Redirect or show messages as needed
        this.router.navigate(['/home']);
  
      });
    
  }
}
