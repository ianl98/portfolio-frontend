import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Idioma } from '../models/idioma';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {
  idiomaURL = 'http://localhost:8080/api/idioma/';

  constructor(private httpClient: HttpClient) { }

  public getIdiomas(): Observable<Idioma[]>{
    return this.httpClient.get<Idioma[]>(this.idiomaURL + 'all');
  }

  public saveIdioma(idioma: Idioma): Observable<any> {
    return this.httpClient.post<any>(this.idiomaURL + 'save', idioma);
  }

  public updateIdioma(id: number, idioma: Idioma): Observable<any> {
    return this.httpClient.put<any>(this.idiomaURL + `edit/${id}`, idioma);
  }

  public deleteIdioma(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.idiomaURL + `delete/${id}`);
  }
}
