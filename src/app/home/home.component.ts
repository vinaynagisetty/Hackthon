import { Component } from '@angular/core';
import { TokenService } from '../token.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private token:TokenService){

  }
  logout(){
    this.token.removeToken();
    

  }

}
