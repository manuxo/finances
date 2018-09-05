import { Component, OnInit } from '@angular/core';
import { ContactViewModel } from './viewmodel';
import { Router } from '@angular/router';
import { MailerService } from '../../services/mailer.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  model: ContactViewModel;

  constructor(private router: Router, private mailer: MailerService) { 
    this.newModel();
  }

  ngOnInit() {
  }

  newModel(): void{
    this.model = new ContactViewModel('','','','');
  }

  onSubmit(){
    this.mailer.sendContactMessage(this.model);
    this.router.navigate(['/home']);
    document.body.scrollIntoView();
  }

  onReset(){
    this.newModel();
  }
}
