import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Lancamento, Usuario } from 'src/app/components/model';
import { FormControl } from '@angular/forms';
import { LancamentoService } from '../lancamento.service';
import * as moment from 'moment';
import { MensagensService } from 'src/app/components/mensagens.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorhandlerService } from 'src/app/components/errorhandler.service';
import * as jQuery from 'jquery';
import { AuthService } from '../../login/auth.service';
var $: any = jQuery;

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.scss']
})
export class LancamentoCadastroComponent implements OnInit {

  lancamento = new Lancamento();

  constructor(
    private lancamentoService: LancamentoService,
    private mensagenService: MensagensService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private errorhandler: ErrorhandlerService,
    private auth : AuthService
  ) {
    if (this.activatedroute.snapshot.params.codigo) {
      this.getLancamento(this.activatedroute.snapshot.params.codigo);
    }
    if(this.auth.jwtPayload.codigo){
      this.lancamento.usuario.codigo = this.auth.jwtPayload.codigo;
    }
  }

  ngOnInit() {
  }

  salvar(form: FormControl) {
    if (this.lancamento.codigo == null) {
      this.lancamento = this.conveter(this.lancamento);
      this.lancamentoService.salvar(this.lancamento)
        .then(() => {
          form.reset();
          this.router.navigateByUrl("/lancamentos");
          this.mensagenService.showNotification('success', 'bottom', 'right', 'Lançamento cadastrado com sucesso!');
        })
        .catch((response) => { this.errorhandler.errorHandler(response); });
    } else {
      this.lancamento = this.conveter(this.lancamento);
      this.lancamentoService.atualizar(this.lancamento.codigo, this.lancamento)
        .then(()=> {
          form.reset();
          this.router.navigateByUrl("/lancamentos");
          this.mensagenService.showNotification('success', 'bottom', 'right', 'Lançamento Atualizado com sucesso!');
        })
        .catch((response) => { this.errorhandler.errorHandler(response); });
    }
  }

  public getLancamento(codigo: number) {
    this.lancamentoService.getLancamento(codigo)
      .then((lancamento) => {
        this.lancamento = lancamento;
      })
      .catch((response) => { this.errorhandler.errorHandler(response); })
  }


  //Convetendo string para data pegando dia da semana por extenso!
  private conveter(lancamento: Lancamento) {
    if (lancamento.dataTrabalho) {
      lancamento.dataTrabalho = moment(lancamento.dataTrabalho, 'YYYY-MM-DD').toDate();
      var semana = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
      var dia = lancamento.dataTrabalho.getDay();
      lancamento.diaSemana = semana[dia];
    }
    return lancamento;
  }
}
