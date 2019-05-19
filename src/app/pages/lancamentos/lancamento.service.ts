import { Injectable } from '@angular/core';
import { Http , URLSearchParams } from '@angular/http';
import { Lancamento, LancamentoFiltro, } from 'src/app/components/model';
import * as moment from 'moment';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../login/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  
  apiUrls = `${environment.apiUrl}/lancamentos`;

  constructor(
    private http : AuthHttp,
    private auth : AuthService
  ) { }

  public pesquisar(filtro : LancamentoFiltro) : Promise<any>{
    const params = new URLSearchParams();

    if(filtro.dataTrabalhoDe){
      params.set('dataTrabalhoDe', moment(filtro.dataTrabalhoDe).format("YYYY-MM-DD"));
    }

    if(filtro.dataTrabalhoAte){
      params.set('dataTrabalhoAte', moment(filtro.dataTrabalhoAte).format("YYYY-MM-DD"));
    }

    if(this.auth.jwtPayload.codigo){
      params.set('usuarioId', this.auth.jwtPayload.codigo)
    }

    return this.http.get(`${this.apiUrls}`, {search : params})
                .toPromise().then(resposta => resposta.json());
  }

  public salvar(lancamento : Lancamento) : Promise<any>{
    return this.http.post(this.apiUrls,lancamento)
                .toPromise().then(resposta => resposta.json());
  }

  public getLancamento(codigo : number): Promise<any>{
    return this.http.get(`${this.apiUrls}/${codigo}`)
                    .toPromise().then(response => response.json());
  }

  public atualizar(codigo : number, lancamento : Lancamento){
    return this.http.put(`${this.apiUrls}/${codigo}`, lancamento)
                     .toPromise().then(response => response.json());       
  }

  public deletar(codigo : number): Promise<any>{
    return this.http.delete(`${this.apiUrls}/${codigo}`)
                    .toPromise().then(resposta => resposta.json());
  }
}
