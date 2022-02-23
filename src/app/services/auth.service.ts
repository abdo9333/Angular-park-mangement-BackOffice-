import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

export interface LoginForm {
    email: string;
    password: string;
  };

export const JWT_NAME = 'blog-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(loginForm: LoginForm) {  

    return this.http.post<any>('http://192.168.33.10:3002/auth/login', {email: loginForm.email, password: loginForm.password}).pipe(
      map((token) => {
        console.log('token' + token.access_token);
        localStorage.setItem(JWT_NAME, token.access_token);
        return token;
      })
    )
  }
  logout() {
    localStorage.removeItem(JWT_NAME);
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired('blog-token');
  }
  
}

/* login(email : string, password: string){
    return this.http.post<any>('http://192.168.33.10:3002/auth/login', {email, password}).pipe(
        map((token) => {
            localStorage.setItem('pass-token', token.access_token);
            return token;
        })
    )
  }*/