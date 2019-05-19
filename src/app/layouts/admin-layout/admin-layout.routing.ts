import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { LancamentoCadastroComponent } from 'src/app/pages/lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentoPesquisarComponent } from 'src/app/pages/lancamentos/lancamento-pesquisar/lancamento-pesquisar.component';
import { AuthGuard } from 'src/app/pages/login/auth.guard';
import { PerfilComponent } from 'src/app/pages/perfil/perfil.component';

export const AdminLayoutRoutes: Routes = [

    { path: 'dashboard', 
    component: DashboardComponent,
    canActivate : [AuthGuard]
    },

    { path: 'lancamentos', 
    component: LancamentoPesquisarComponent ,
    canActivate : [AuthGuard]
    },

    { path: 'lancamento/novo', 
    component: LancamentoCadastroComponent,
    canActivate : [AuthGuard] 
    },

    { path: 'lancamento/:codigo', 
    component: LancamentoCadastroComponent,
    canActivate : [AuthGuard]
    },

    { path: 'perfil', 
    component: PerfilComponent,
    canActivate : [AuthGuard]
    }
];
