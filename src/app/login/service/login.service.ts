import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  generateToken(credential:any){
    return this.http.post(`${environment.apiBaseUrl}/employeeAuth/token`,credential)
  }

  loginUser(token: string){
      localStorage.setItem("token",token);
      return true;
  }

  getToken(){
      return localStorage.getItem("token");
  }

  isLoggedIn(){
    let token = localStorage.getItem("token");
    if(token==undefined || token==null || token ==""){
      return false;
    }
    return true;
  }

  logout(){
    localStorage.removeItem('token');
    return true;
  }

}
