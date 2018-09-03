import { Component, OnInit } from '@angular/core';
import { RegisterViewModel } from './viewmodel';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: RegisterViewModel;

  constructor(public auth: AuthService, private router: Router) {
    this.newModel();
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this.auth.save(this.model).subscribe(res => {
      this.auth.login(this.model);
    });
  }

  newModel(): void{
    this.model = new RegisterViewModel('','','','','');
  }
}
