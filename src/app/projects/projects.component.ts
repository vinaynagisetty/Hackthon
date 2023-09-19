import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit{
  role:any;
  Projecrlist:any;
  constructor(private auth:AuthService){

  }
  ngOnInit(): void {
    this.role=localStorage.getItem('role');
    if(this.role=="Admin"){
      this.role=true;
    }
    else{
      this.role=false;
    }
    this.ProjectShow();
  }
  ProjectShow(){
    this.auth.projectList().subscribe(response =>{
   this.Projecrlist=response.data;
   console.log(this.Projecrlist)
      })

  }
  

  
}
