import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../models/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  educacionURL = 'https://portfolio-backend-argprog.herokuapp.com/api/educacion/';

  constructor(private httpClient: HttpClient) { }

  public getEducaciones(): Observable<Educacion[]>{
    return this.httpClient.get<Educacion[]>(this.educacionURL + 'all');
  }

  public uploadImage(formData: FormData, header: HttpHeaders): Observable<any> {
    return this.httpClient.post<any>(this.educacionURL + 'upload', formData, {headers: header});
  }

  public saveEducacion(formData: FormData, header: HttpHeaders): Observable<any> {
    return this.httpClient.post<any>(this.educacionURL + 'save', formData, {headers: header});
  }

  public updateEducacion(id: number, formData: FormData, header: HttpHeaders): Observable<any> {
    return this.httpClient.put<any>(this.educacionURL + `edit/${id}`, formData, {headers: header});
  }

  public deleteEducacion(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.educacionURL + `delete/${id}`);
  }
}
