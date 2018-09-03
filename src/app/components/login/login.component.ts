import { Component, OnInit } from '@angular/core';
import { LoginViewModel } from './viewmodel';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: LoginViewModel;

  constructor(public auth: AuthService, private router: Router) { 
    this.newModel();
  }

  ngOnInit() {
  }

  onSubmit(){
    this.auth.login(this.model,null);
  }

  newModel(): void{
    this.model = new LoginViewModel('','');
  }

}
