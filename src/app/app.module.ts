import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule ,LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { JwtHelper } from 'angular2-jwt';
import localePt from '@angular/common/locales/pt';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { registerLocaleData } from '@angular/common';
import { SegurancaModule } from './pages/login/seguranca.module';
registerLocaleData(localePt, 'pt-BR');

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ComponentsModule,
    SegurancaModule,
    NgbModule,
    RouterModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
  ],
  providers: [
    JwtHelper,
    {provide : LOCALE_ID, useValue: "pt-BR"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
