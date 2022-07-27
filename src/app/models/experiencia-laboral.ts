export class ExperienciaLaboral {
    id?: number;
    empresa: string;
    cargo: string;
    logo: string;
    inicio: Date;
    fin: string;

    constructor(empresa: string, cargo: string, logo: string, inicio: Date, fin: string){
        this.empresa = empresa;
        this.cargo = cargo;
        this.logo = logo;
        this.inicio = inicio;
        this.fin = fin;
    }
}
