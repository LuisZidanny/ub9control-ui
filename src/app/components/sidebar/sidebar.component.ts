import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorhandlerService } from '../errorhandler.service';
import { LogoutService } from 'src/app/pages/login/logout.service';
import { AuthService } from 'src/app/pages/login/auth.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'fa-tachometer-alt', class: '' },
    { path: '/lancamento/novo', title: 'Novo Lançamento',  icon: 'fa-chart-line', class: '' },
    { path: '/lancamentos', title: 'Listar Lançamentos',  icon:'fa-th-list', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(
    private router: Router,
    private errorhandler: ErrorhandlerService,
    private logoutService : LogoutService,
    private auth : AuthService
  ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  logout(){
    this.logoutService.logout()
      .then(() =>{
        this.router.navigate(['login']);
      })
      .catch(error => this.errorhandler.errorHandler(error))
  }
}
