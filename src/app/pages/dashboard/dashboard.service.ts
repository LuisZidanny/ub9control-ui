import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from '../login/auth.service';
import { AuthHttp } from 'angular2-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiUrls = `${environment.apiUrl}/lancamentos`;

  constructor(private http : AuthHttp, private auth : AuthService ) { }

  listarLancamentoDiario(codigo : number){
    return this.http.get(`${this.apiUrls}/diario/${codigo}`)
                          .toPromise().then(resposta => resposta.json());
  }

  listarLancamentoSemanal(codigo : number){
    return this.http.get(`${this.apiUrls}/semanal/${codigo}`)
                          .toPromise().then(resposta => resposta.json());
  }

  listarLancamentoMensal(codigo : number){
    return this.http.get(`${this.apiUrls}/mensal/${codigo}`)
                          .toPromise().then(resposta => resposta.json());   
  }

}
