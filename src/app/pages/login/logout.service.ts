import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthHttp } from 'angular2-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  logoutTokenUrl = `${environment.apiUrl}/tokens/revoke`;

  constructor(
    private http : AuthHttp,
    private auth : AuthService) { }

  logout(): Promise<void>{
    return this.http.delete(this.logoutTokenUrl , { withCredentials : true})
             .toPromise()
             .then(() => {
                 this.auth.limparAccessToken();
             })
      }
}
