import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tecnologia } from '../models/tecnologia';

@Injectable({
  providedIn: 'root'
})
export class TecnologiaService {
  tecnologiaURL = 'http://localhost:8080/api/tecnologia/';

  constructor(private httpClient: HttpClient) { }

  public getTecnologias(): Observable<Tecnologia[]>{
    return this.httpClient.get<Tecnologia[]>(this.tecnologiaURL + 'all');
  }

  public saveTecnologia(tecnologia: Tecnologia): Observable<any> {
    return this.httpClient.post<any>(this.tecnologiaURL + 'save', tecnologia);
  }

  public updateTecnologia(id: number, tecnologia: Tecnologia): Observable<any> {
    return this.httpClient.put<any>(this.tecnologiaURL + `edit/${id}`, tecnologia);
  }

  public deleteTecnologia(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.tecnologiaURL + `delete/${id}`);
  }

  public getProyectos(id: number): Observable<any>{
    return this.httpClient.get<any>(this.tecnologiaURL + `proyectos/${id}`);
  }
}
