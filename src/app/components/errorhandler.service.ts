import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MensagensService } from './mensagens.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandlerService {

  constructor(
    private mensagens : MensagensService,
    private router : Router
    ) {}

  errorHandler(errorResponse : any){

    let msg : string
    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse.status >= 400 && errorResponse.status <= 499) {
      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      try {
        errors = errorResponse.json();

        msg = errors[0].mensagemUsuario;
      } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }

    this.mensagens.showNotification('danger','bottom','right', msg)
  }
}
