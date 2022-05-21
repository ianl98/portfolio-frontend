import { Tecnologia } from './tecnologia';
export class Proyecto {
    id?: number;
    nombre: string;
    url: string;
    descripcion: string;
    tecnologias: Tecnologia[];

    constructor(nombre: string, url: string, descripcion: string, tecnologias: Tecnologia[]){
        this.nombre = nombre;
        this.url = url;
        this.descripcion = descripcion;
        this.tecnologias = tecnologias;
    }
}
