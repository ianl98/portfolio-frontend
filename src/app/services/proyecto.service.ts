import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  proyectoURL = 'http://localhost:8080/api/proyecto/';

  constructor(private httpClient: HttpClient) { }

  public getProyectos(): Observable<Proyecto[]>{
    return this.httpClient.get<Proyecto[]>(this.proyectoURL + 'all');
  }

  public saveProyecto(proyecto: Proyecto): Observable<any> {
    return this.httpClient.post<any>(this.proyectoURL + 'save', proyecto);
  }

  public updateProyecto(id: number, proyecto: Proyecto): Observable<any> {
    return this.httpClient.put<any>(this.proyectoURL + `edit/${id}`, proyecto);
  }

  public deleteProyecto(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.proyectoURL + `delete/${id}`);
  }

  public getTecnologias(id: number): Observable<any>{
    return this.httpClient.get<any>(this.proyectoURL + `tecnologias/${id}`);
  }
}
