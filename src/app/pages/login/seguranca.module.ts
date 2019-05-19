import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MoneyHttp } from './money-http';
import { AuthService } from './auth.service';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { RequestOptions, Http } from '@angular/http';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login.component';

export function authHttpServiceFactory(auth: AuthService, http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    globalHeaders: [
      { 'Content-Type': 'application/json' }
    ]
  });

  return new MoneyHttp(auth, config, http, options);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

  ],
  declarations: [],
  providers :[
    {
      provide : AuthHttp,
      useFactory : authHttpServiceFactory,
      deps: [AuthService, Http, RequestOptions]
    },
    AuthGuard
  ]
})
export class SegurancaModule { }
