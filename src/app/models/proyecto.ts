import { Tecnologia } from './tecnologia';
export class Proyecto {
    id?: number;
    nombre: string;
    url: string;
    descripcion: string;

    constructor(nombre: string, url: string, descripcion: string){
        this.nombre = nombre;
        this.url = url;
        this.descripcion = descripcion;
    }
}
