export class ExperienciaLaboral {
    id?: number;
    empresa: string;
    cargo: string;
    inicio: Date;
    fin: string;

    constructor(empresa: string, cargo: string, inicio: Date, fin: string){
        this.empresa = empresa;
        this.cargo = cargo;
        this.inicio = inicio;
        this.fin = fin;
    }
}
