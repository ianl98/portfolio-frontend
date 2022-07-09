import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../models/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  educacionURL = 'http://localhost:8080/api/educacion/';

  constructor(private httpClient: HttpClient) { }

  public getEducaciones(): Observable<Educacion[]>{
    return this.httpClient.get<Educacion[]>(this.educacionURL + 'all');
  }

  public uploadImage(formData: FormData, header: HttpHeaders): Observable<any> {
    return this.httpClient.post<any>(this.educacionURL + 'upload', formData, {headers: header});
  }

  public saveEducacion(educacion: Educacion): Observable<any> {
    return this.httpClient.post<any>(this.educacionURL + 'save', educacion);
  }

  public updateEducacion(id: number, educacion: Educacion): Observable<any> {
    return this.httpClient.put<any>(this.educacionURL + `edit/${id}`, educacion);
  }

  public deleteEducacion(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.educacionURL + `delete/${id}`);
  }
}
