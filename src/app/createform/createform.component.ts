import { ImplicitReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-createform',
  templateUrl: './createform.component.html',
  styleUrls: ['./createform.component.css']
})
export class CreateformComponent implements OnInit   {
  form!: FormGroup;
  role:any;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      projectname:['',Validators.required],
      url: ['', Validators.required],
      numUsers: ['', [Validators.required, Validators.min(1)]],
      testDuration: ['', [Validators.required, Validators.min(1)]],
      rampUpTime: ['', [Validators.required, Validators.min(1)]],
      testType: ['']
    });
this.role=localStorage.getItem('role');
console.log(this.role)
  }
  // create(){
  //   if (this.form.valid) {
  //     // You can access form values using this.form.value
  //     const formData = this.form.value;
  //     console.log('Form Data:', formData);

  //     // Add your logic to start the password reset test here
  //   } else {
  //     // Form is not valid, display error messages or take appropriate action
  //   }
  // }
  create(details:any) {
    if (this.form.valid) {
      let dataparams={
        Project_name:details.projectname,
        ramp_up_time:details.rampUpTime,
        project_url:details.url,
        number_of_users:details.numUsers,
        test_duration:details.testDuration,
        test_type:details.testType,
      }
      this.authService.createProject(dataparams).subscribe(response =>{
      console.log(response);
      })
      this.router.navigate(['/projects']);
    

      // this.As.signUp(user).subscribe(response => {
      // Convert form data to JMX XML string
     
  }
  
  // Function to convert form data to JMX format
  // Function to convert form data to JMX format
// Function to convert form data to JMX format
// Function to convert form data to JMX format
  }


  

}
