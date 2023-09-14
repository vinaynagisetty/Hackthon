import { ImplicitReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createform',
  templateUrl: './createform.component.html',
  styleUrls: ['./createform.component.css']
})
export class CreateformComponent implements OnInit   {
  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      projectname:['',Validators.required],
      url: ['', Validators.required],
      numUsers: ['', [Validators.required, Validators.min(1)]],
      testDuration: ['', [Validators.required, Validators.min(1)]],
      rampUpTime: ['', [Validators.required, Validators.min(1)]],
      testType: ['', Validators.required]
    });
  }
  create(){
    if (this.form.valid) {
      // You can access form values using this.form.value
      const formData = this.form.value;
      console.log('Form Data:', formData);

      // Add your logic to start the password reset test here
    } else {
      // Form is not valid, display error messages or take appropriate action
    }
  }

}
