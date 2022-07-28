export class Persona {
    id?: number;
    nombre: string;
    apellido: string;
    sobreMi: string;
    localidad: string;
    titulo: string
    fotoPerfil: string;

    constructor(nombre: string, apellido: string, sobreMi: string, localidad: string, titulo: string, fotoPerfil: string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.sobreMi = sobreMi;
        this.localidad = localidad;
        this.titulo = titulo;
        this.fotoPerfil = fotoPerfil;
    }
}
