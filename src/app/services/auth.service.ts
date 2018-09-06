import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersURL = `${environment.baseUrl}/api/users`;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };
  private jwt: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router, private alertService: AlertService) {}

  save(user): Observable<any>{
    const url = `${this.usersURL}/signup`;
    return this.http.post<any>(url,user,this.httpOptions);
  }
  login(user): void{
    const url = `${this.usersURL}/login`;
    this.http.post<any>(url,user,this.httpOptions).subscribe(res => {
      localStorage.setItem('token',res.token);
      localStorage.setItem('userData', JSON.stringify(res.userData));
      this.router.navigate(['/home']);
      this.alertService.success(`Bienvenido ${user.email}`);
    }, error => {
      this.alertService.error('Error al iniciar sesión');
    });
  }
  isAuthenticated(): boolean{
    const token = localStorage.getItem('token');
    if(token)
      return !this.jwt.isTokenExpired(token);
    return false;
  }

  getUserData(): any{
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData;
  }

  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  }

}
