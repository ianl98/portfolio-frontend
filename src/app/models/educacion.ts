export class Educacion {
    id?: number;
    institucion: string;
    carrera: string;
    foto: string;
    inicio: string;
    fin: string;

    constructor(institucion: string, carrera: string, foto: string, inicio: string, fin: string){
        this.institucion = institucion;
        this.carrera = carrera;
        this.foto = foto;
        this.inicio = inicio;
        this.fin = fin;
    }
}
