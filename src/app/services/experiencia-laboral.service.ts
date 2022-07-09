import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExperienciaLaboral } from '../models/experiencia-laboral';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaLaboralService {

  experienciaLaboarlURL = 'http://localhost:8080/api/experienciaLaboral/';

  constructor(private httpClient: HttpClient) { }

  public getExperienciasLaborales(): Observable<ExperienciaLaboral[]>{
    return this.httpClient.get<ExperienciaLaboral[]>(this.experienciaLaboarlURL + 'all');
  }

  public saveExperienciaLaboral(experienciaLaboral: ExperienciaLaboral): Observable<any> {
    return this.httpClient.post<any>(this.experienciaLaboarlURL + 'save', experienciaLaboral);
  }

  public updateExperienciaLaboral(id: number, experienciaLaboral: ExperienciaLaboral): Observable<any> {
    return this.httpClient.put<any>(this.experienciaLaboarlURL + `edit/${id}`, experienciaLaboral);
  }

  public deleteEducacion(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.experienciaLaboarlURL + `delete/${id}`);
  }
}
