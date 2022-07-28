import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  personaURL = 'http://localhost:8080/api/persona/';

  constructor(private httpClient: HttpClient) { }

  public getPersonas(): Observable<Persona[]>{
    return this.httpClient.get<Persona[]>(this.personaURL + 'all');
  }

  public savePersona(persona: Persona): Observable<any> {
    return this.httpClient.post<any>(this.personaURL + 'save', persona);
  }

  public updatePersona(id: number, formData: FormData, header: HttpHeaders): Observable<any> {
    return this.httpClient.put<any>(this.personaURL + `edit/${id}`, formData, {headers: header});
  }

  public deletePersona(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.personaURL + `delete/${id}`);
  }
}
