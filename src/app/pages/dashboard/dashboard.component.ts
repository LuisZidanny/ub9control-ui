import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1
} from "../../variables/charts";
import { DashboardService } from './dashboard.service';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public lancamentos = [];
  public semanal = [];
  public lancamentoMensal = [];
  public totalSemanal : any = 0.0;
  public totalMensal : any = 0.0;
  public totalDiario : any = 0.0;

  constructor(private dashboardService : DashboardService, private auth : AuthService) { 
  }

  ngOnInit() {
    if(this.auth.jwtPayload.codigo){
    this.listarLancamentoDiario(this.auth.jwtPayload.codigo);
    this.listarLancamentoSemanal(this.auth.jwtPayload.codigo);
    this.listarLancamentoMensal(this.auth.jwtPayload.codigo);
    }
  }

  listarLancamentoDiario(codigo : number){
    this.dashboardService.listarLancamentoDiario(codigo)
          .then((resposta) =>{
            this.totalDiario = resposta.total;
          },() => { });
  }

  listarLancamentoSemanal(codigo : number){
    this.dashboardService.listarLancamentoSemanal(codigo)
          .then((resposta) =>{
            this.semanal = <any> resposta;
            parseOptions(Chart, chartOptions());
            const chartSales = document.getElementById('chart-sales');
            this.salesChart = new Chart(chartSales, {
              type: 'bar',
              options: chartExample1.options,
              data: {
                labels: ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'],
                datasets: [{
                  label: 'Performance',
                  data: [
                    this.semanal[0] && this.semanal[0].diaSemana == 'segunda'? this.semanal[0].total : 0.0 ,
                    this.semanal[1] && this.semanal[1].diaSemana == 'terça'? this.semanal[1].total : this.semanal[0] && this.semanal[0].diaSemana == 'terça' ? this.semanal[0].total : 0.0,
                    this.semanal[2] && this.semanal[2].diaSemana == 'quarta'? this.semanal[2].total : this.semanal[0] && this.semanal[0].diaSemana == 'quarta' ? this.semanal[0].total : this.semanal[1] && this.semanal[1].diaSemana == 'quarta' ? this.semanal[1].total : 0.0,
                    this.semanal[3] && this.semanal[3].diaSemana == 'quinta'? this.semanal[3].total : this.semanal[0] && this.semanal[0].diaSemana == 'quinta' ? this.semanal[0].total : this.semanal[1] && this.semanal[1].diaSemana == 'quinta' ? this.semanal[1].total : this.semanal[2] && this.semanal[2].diaSemana == 'quinta' ? this.semanal[2].total : 0.0,
                    this.semanal[4] && this.semanal[4].diaSemana == 'sexta'? this.semanal[4].total : this.semanal[0] && this.semanal[0].diaSemana == 'sexta' ? this.semanal[0].total : this.semanal[1] && this.semanal[1].diaSemana == 'sexta' ? this.semanal[1].total : this.semanal[2] && this.semanal[2].diaSemana == 'sexta' ? this.semanal[2].total : this.semanal[3] && this.semanal[3].diaSemana == 'sexta' ? this.semanal[3].total : 0.0,
                    this.semanal[5] && this.semanal[5].diaSemana == 'sábado'? this.semanal[5].total : this.semanal[0] && this.semanal[0].diaSemana == 'sábado' ? this.semanal[0].total : this.semanal[1] && this.semanal[1].diaSemana == 'sábado' ? this.semanal[1].total : this.semanal[2] && this.semanal[2].diaSemana == 'sábado' ? this.semanal[2].total : this.semanal[3] && this.semanal[3].diaSemana == 'sábado' ? this.semanal[3].total : this.semanal[4] && this.semanal[4].diaSemana == 'sábado' ? this.semanal[4].total : 0.0,
                    this.semanal[6] && this.semanal[6].diaSemana == 'domingo'? this.semanal[6].total : this.semanal[0] && this.semanal[0].diaSemana == 'domingo' ? this.semanal[0].total : this.semanal[1] && this.semanal[1].diaSemana == 'domingo' ? this.semanal[1].total : this.semanal[2] && this.semanal[2].diaSemana == 'domingo' ? this.semanal[2].total : this.semanal[3] && this.semanal[3].diaSemana == 'domingo' ? this.semanal[3].total : this.semanal[4] && this.semanal[4].diaSemana == 'domingo' ? this.semanal[4].total : this.semanal[5] && this.semanal[5].diaSemana == 'domingo' ? this.semanal[5].total : 0.0,
                  ]
                }]
              }
            });
            this.valorTotalSemanal();
          },() => { });
  }

  listarLancamentoMensal(codigo : number){
    this.dashboardService.listarLancamentoMensal(codigo)
          .then((resposta) =>{
            this.lancamentoMensal = <any> resposta;
            this.valorTotalMensal();
          },() => { });
  }

  public valorTotalSemanal(){
    let soma = 0;
    if(this.semanal.length > 0){
      for (const semanal of this.semanal) {
        soma = soma + semanal.total;
      }
      this.totalSemanal = soma;
    }
    return soma;
  }

  public valorTotalMensal(){
    let soma = 0;
    if(this.lancamentoMensal.length > 0){
      for (const mensal of this.lancamentoMensal) {
        soma = soma + mensal.total;
      }
      this.totalMensal = soma;
    }
    return soma;
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }
}
