import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersURL = `${environment.url}/api/users` || `http://localhost:3000/api/users`;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };
  private jwt: JwtHelper = new JwtHelper();

  constructor(private http: HttpClient, private router: Router) {}

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
