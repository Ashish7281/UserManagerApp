import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IAdminLogin } from '../contracts/AdminInterface';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient, private router:Router) { }

  // Check for Admin`s username and password and save token in localstorage.
  login(admin: IAdminLogin) {
    if (admin.username == "admin" && admin.password == "admin@123") {            
      localStorage.setItem('token',"QpwL5tke4Pnpja7X4")
      this.router.navigateByUrl('/users');
    }
  }

  // Check for user logged in or not
  public isLoggedIn(): boolean {
    let status = false;
    if (localStorage.getItem('token')) {
      console.log(localStorage.getItem('token'));
      
      status = true;
    }
    else {
      status = false;
    }   
    
    return status;
  }
}
