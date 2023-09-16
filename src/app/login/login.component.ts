import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private token:TokenService) {
    this.form = this.fb.group({
      email: '',
      password: ''
    });
  }

  login(credentials:any): void {
    let dataparams={
      username:credentials.email,
      password:credentials.password
    }
      this.authService.login(dataparams).subscribe(response => {
           if(response.status==true){
            this.token.setToken(response.data.token)
            this.router.navigate(['/home']);
           }
        // Redirect or show messages as needed
       
  
      });
    
  }
}
