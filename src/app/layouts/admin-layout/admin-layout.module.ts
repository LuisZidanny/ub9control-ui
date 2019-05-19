import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LancamentoCadastroComponent } from 'src/app/pages/lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentoPesquisarComponent } from 'src/app/pages/lancamentos/lancamento-pesquisar/lancamento-pesquisar.component';
import { PerfilComponent } from 'src/app/pages/perfil/perfil.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    LancamentoCadastroComponent,
    LancamentoPesquisarComponent,
    PerfilComponent
  ]
})

export class AdminLayoutModule {}
