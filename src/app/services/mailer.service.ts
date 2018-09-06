import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class MailerService {

  private emailURL = `${environment.baseUrl}/api/email`;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };


  constructor(private http: HttpClient, private router: Router, private alert: AlertService) {}

  sendContactMessage(model): void{
    const url = `${this.emailURL}/contact`;
    this.http.post<any>(url,model,this.httpOptions).subscribe(data => {
      const message = data;
      this.alert.success(message.success);
    }, error => {
      this.alert.error('Error al enviar mensaje.');
    });
  }
}
