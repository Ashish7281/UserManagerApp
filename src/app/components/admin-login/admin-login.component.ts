import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAdminLogin } from 'src/app/contracts/AdminInterface';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(private router: Router, public loginService:LoginService) { }

  ngOnInit(): void {
  }

  onLogin(admin: IAdminLogin) {
     this.loginService.login(admin);     
    
  }
}
