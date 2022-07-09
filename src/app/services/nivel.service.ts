import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nivel } from '../models/nivel';

@Injectable({
  providedIn: 'root'
})
export class NivelService {
  nivelURL = 'http://localhost:8080/api/nivel/';

  constructor(private httpClient: HttpClient) { }

  public getNiveles(): Observable<Nivel[]>{
    return this.httpClient.get<Nivel[]>(this.nivelURL + 'all');
  }

  public saveNivel(nivel: Nivel): Observable<any> {
    return this.httpClient.post<any>(this.nivelURL + 'save', nivel);
  }

  public updateNivel(id: number, nivel: Nivel): Observable<any> {
    return this.httpClient.put<any>(this.nivelURL + `edit/${id}`, nivel);
  }

  public deleteNivel(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.nivelURL + `delete/${id}`);
  }
}
