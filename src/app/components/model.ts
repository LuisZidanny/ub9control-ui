export class Lancamento {
    codigo: number;
    uber : number;
    novenove: number;
    cabify: number; 
    particular: number;
    combustivel: number;
    refeicao: number;
    diaSemana : String;
    dataTrabalho: Date;
    usuario = new Usuario();
}

export class LancamentoFiltro{
    dataTrabalhoDe : Date;
    dataTrabalhoAte : Date;
  }

export class Login{
    email : string;
    senha: string;
}

export class Usuario{
    codigo: number;
    nome : String;
    email: String;
    senha: String;
}