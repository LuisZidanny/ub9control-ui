import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register/register.service';
import { Usuario } from 'src/app/components/model';
import { ErrorhandlerService } from 'src/app/components/errorhandler.service';
import { AuthService } from '../login/auth.service';
import { FormControl, NgForm } from '@angular/forms';
import { MensagensService } from 'src/app/components/mensagens.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuario = new Usuario();
  alterarSenhaususario = new Usuario();
  comparasenha: boolean = false;

  constructor(private registerService: RegisterService,
    private errorhandler: ErrorhandlerService,
    private auth: AuthService,
    private router: Router,
    private mensagenService: MensagensService,
  ) { }

  ngOnInit() {
    if (this.auth.jwtPayload.codigo) {
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

  atualizar(form: FormControl) {
    if (this.usuario.codigo != null) {
      this.registerService.atualizar(this.usuario.codigo, this.usuario)
        .then(() => {
          this.router.navigateByUrl("/dashboard");
          this.mensagenService.showNotification('success', 'bottom', 'right', 'Usuário Atualizado com sucesso!');
        })
        .catch((response) => { this.errorhandler.errorHandler(response); });
    }
  }

  alterarSenha(form: FormControl,senha : String){
    if (this.usuario.codigo != null) {
      this.registerService.atualizarSenha(this.usuario.codigo, senha)
        .then(() => {
          form.reset();
          this.router.navigateByUrl("/dashboard");
          this.mensagenService.showNotification('success', 'bottom', 'right', 'Senha Atualizado com sucesso!');
        })
        .catch((response) => { this.errorhandler.errorHandler(response); });
    }
  }

  compararSenha() {
    var senha = <HTMLInputElement>document.getElementById("senha");
    var Csenha = <HTMLInputElement>document.getElementById("Csenha");
    if (senha.value === Csenha.value) {
      this.comparasenha = false;
    } else {
      this.comparasenha = true;
    }
  }
}
