import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { ErrorhandlerService } from 'src/app/components/errorhandler.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/components/model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  
  loginForm = new Login();

  constructor(
    private auth: AuthService,
    private errorhandler: ErrorhandlerService,
    private router : Router
    ) { }

  login() {
    this.auth.login(this.loginForm.email,this.loginForm.senha)
      .then(() =>{
        this.router.navigateByUrl('/dashboard');
      })
      .catch((error) =>{
        this.errorhandler.errorHandler(error);
      });
  }

}
