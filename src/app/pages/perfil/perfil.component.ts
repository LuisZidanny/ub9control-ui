import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register/register.service';
import { Usuario } from 'src/app/components/model';
import { ErrorhandlerService } from 'src/app/components/errorhandler.service';
import { AuthService } from '../login/auth.service';
import { FormControl } from '@angular/forms';
import { MensagensService } from 'src/app/components/mensagens.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuario = new Usuario();

  constructor(private registerService: RegisterService,
    private errorhandler: ErrorhandlerService,
    private auth : AuthService,
    private router: Router,
    private mensagenService: MensagensService,
  ) { }

  ngOnInit() {
    if(this.auth.jwtPayload.codigo){
      this.getLancamento(this.auth.jwtPayload.codigo);
    }
  }

  public getLancamento(codigo: number) {
    this.registerService.getUsuario(codigo)
      .then((usuario) => {
        this.usuario = usuario;
      })
      .catch((response) => { this.errorhandler.errorHandler(response); })
  }

  salvar(form: FormControl) {
    if (this.usuario.codigo != null) {
      this.registerService.atualizar(this.usuario.codigo, this.usuario)
        .then(()=> {
          this.router.navigateByUrl("/perfil");
          this.mensagenService.showNotification('success', 'bottom', 'right', 'Usuário Atualizado com sucesso!');
        })
        .catch((response) => { this.errorhandler.errorHandler(response); });
    }
  }
}
