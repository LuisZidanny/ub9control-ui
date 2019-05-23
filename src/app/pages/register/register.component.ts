import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/components/model';
import { FormControl } from '@angular/forms';
import { RegisterService } from './register.service';
import { MensagensService } from 'src/app/components/mensagens.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorhandlerService } from 'src/app/components/errorhandler.service';
import { AuthService } from '../login/auth.service';
import { LogoutService } from '../login/logout.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  usuario = new Usuario();

  constructor(private registerService : RegisterService,private mensagenService: MensagensService,
    private router: Router,private activatedroute: ActivatedRoute,
    private errorhandler: ErrorhandlerService,
    private auth : AuthService,
    private logoutService : LogoutService
  ) { }

  ngOnInit() {
  }

  salvar(form: FormControl){
    var email = 'admincadastrousuario@gmail.com';
    var senha = 'admin';
    this.auth.login(email,senha).then( () =>{
      this.registerService.salvar(this.usuario)
      .then(() => {
        form.reset();
        this.logoutService.logout();
        this.router.navigateByUrl("/login");
        this.mensagenService.showNotification('success', 'bottom', 'right', 'Usuário cadastrado com sucesso!');
      })
      .catch((response) => { this.errorhandler.errorHandler(response); });
    })
    .catch((response) => { this.errorhandler.errorHandler(response); });
  }
}
