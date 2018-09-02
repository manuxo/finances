import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersURL = `http://localhost:3000/api/users`;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };
  private jwt: JwtHelper = new JwtHelper();

  constructor(private http: HttpClient) {}

  save(user): Observable<any>{
    const url = `${this.usersURL}/signup`;
    return this.http.post<any>(url,user,this.httpOptions);
  }
  login(user): Observable<any>{
    const url = `${this.usersURL}/login`;
    return this.http.post<any>(url,user,this.httpOptions);
  }
  isAuthenticated(): boolean{
    const token = localStorage.getItem('token');
    if(token)
      return this.jwt.isTokenExpired(token);
    return false;
  }

  logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  }

}
