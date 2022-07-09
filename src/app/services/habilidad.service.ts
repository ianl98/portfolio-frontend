import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habilidad } from '../models/habilidad';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  habilidadURL = 'http://localhost:8080/api/habilidad/';

  constructor(private httpClient: HttpClient) { }

  public getHabilidades(): Observable<Habilidad[]>{
    return this.httpClient.get<Habilidad[]>(this.habilidadURL + 'all');
  }

  public saveHabilidad(habilidad: Habilidad): Observable<any> {
    return this.httpClient.post<any>(this.habilidadURL + 'save', habilidad);
  }

  public updateHabilidad(id: number, habilidad: Habilidad): Observable<any> {
    return this.httpClient.put<any>(this.habilidadURL + `edit/${id}`, habilidad);
  }

  public deleteHabilidad(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.habilidadURL + `delete/${id}`);
  }
}
