import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/components/model';
import { environment } from 'src/environments/environment';
import { AuthHttp } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiUrls = `${environment.apiUrl}/usuarios`;

  constructor(private http : AuthHttp) { }

  public salvar(usuario : Usuario) : Promise<any>{
    return this.http.post(this.apiUrls,usuario)
                .toPromise().then(resposta => resposta.json());
  }

  public getUsuario(codigo : number): Promise<any>{
    return this.http.get(`${this.apiUrls}/${codigo}`)
                    .toPromise().then(response => response.json());
  }

  public atualizar(codigo : number, usuario : Usuario){
    return this.http.put(`${this.apiUrls}/${codigo}`, usuario)
                     .toPromise().then(response => response.json());       
  }
}
