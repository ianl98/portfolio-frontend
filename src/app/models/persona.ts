export class Persona {
    id?: number;
    nombre: string;
    apellido: string;
    sobreMi: string;
    email: string;
    fotoPerfil: string;

    constructor(nombre: string, apellido: string, sobreMi: string, email: string, fotoPerfil: string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.sobreMi = sobreMi;
        this.email = email;
        this.fotoPerfil = fotoPerfil;
    }
}
