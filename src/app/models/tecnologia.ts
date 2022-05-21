import { Proyecto } from './proyecto';
export class Tecnologia {
    id?: number;
    nombre: string;
    proyectos: Proyecto[];

    constructor(nombre: string, proyectos: Proyecto[]){
        this.nombre = nombre;
        this.proyectos = proyectos;
    }
}
