import { Nivel } from './nivel';
export class Idioma {
    id?: number;
    nombre: string;
    nivel: Nivel;

    constructor(nombre: string, nivel: Nivel){
        this.nombre = nombre;
        this.nivel = nivel;
    }
}
