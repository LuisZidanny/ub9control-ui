import { Component, OnInit } from '@angular/core';
import { LancamentoService } from '../lancamento.service';
import { PagerService } from '../pager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LancamentoFiltro } from 'src/app/components/model';
import { ErrorhandlerService } from 'src/app/components/errorhandler.service';
import { MensagensService } from 'src/app/components/mensagens.service';

@Component({
  selector: 'app-lancamento-pesquisar',
  templateUrl: './lancamento-pesquisar.component.html',
  styleUrls: ['./lancamento-pesquisar.component.scss']
})
export class LancamentoPesquisarComponent implements OnInit {

  filtro = new LancamentoFiltro();
  lancamentos: any[];
  // array com todos os itens a serem paginados
  private allItems: any[];
  // pager object
  pager: any = {};
  // items paginados
  pagedItems: any[];
  //Para excluir
  codigo: any;
  total: any;

  constructor(
    private lancamentoService: LancamentoService,
    private pagerService: PagerService,
    private mensagenService: MensagensService,
    private errorhandler: ErrorhandlerService
  ) { }

  ngOnInit() {
    this.pesquisar();
  }

  public pesquisar() {
    if (this.filtro.dataTrabalhoDe > this.filtro.dataTrabalhoAte) {
      this.mensagenService.showNotification('danger', 'bottom', 'right', 'Data Final não pode ser anterior a Inicial!!');
      this.filtro = new LancamentoFiltro();
    } else {
      this.lancamentoService.pesquisar(this.filtro)
        .then((resposta) => {
          //Definir os itens para a resposta json
          this.allItems = <any>resposta;
          this.lancamentos = <any>resposta;
          this.subtotal();
          //Inicializar na página 1
          this.setPage(1);
          this.filtro = new LancamentoFiltro();
        }
        ).catch((response) => { this.errorhandler.errorHandler(response); })
    }
  }

  public deletar() {
    this.lancamentoService.deletar(this.codigo)
      .then(() => {
        this.pesquisar();
        this.mensagenService.showNotification('success', 'bottom', 'right', 'Lançamento excluído com sucesso!');
      })
      .catch((response) => { this.errorhandler.errorHandler(response); })
  }

  public subtotal() {
    var soma = 0;
    this.total = 0;
    if (this.lancamentos.length > 0) {
      for (const lancamento of this.lancamentos) {
        soma = soma + lancamento.total
      }
      this.total = soma;
    }
    return soma;
  }

  public modal(codigo: number) {
    this.codigo = codigo;
  }

  existemLancamento(): boolean {
    return this.lancamentos && this.lancamentos.length > 0;
  }

  setPage(page: number) {
    if (page < 1) {
      return;
    }
    // pega o objeto pager do serviço
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    // pega a página atual de itens
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
