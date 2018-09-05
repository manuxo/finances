import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailerService {

  private emailURL = `${environment.baseUrl}/api/email`;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };


  constructor(private http: HttpClient) {}

  sendContactMessage(model): void{
    const url = `${this.emailURL}/contact`;
    this.http.post<any>(url,model,this.httpOptions).subscribe(data => {
      console.log('Correo enviado');
    });
  }
}
