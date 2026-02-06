import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Outil } from 'src/modeles/outil';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  private baseUrl = 'http://localhost:9000/OUTIL/outils';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Outil[]> {
    return this.http.get<Outil[]>(this.baseUrl);
  }

  getById(id: string): Observable<Outil> {
    return this.http.get<Outil>(`${this.baseUrl}/${id}`);
  }

  add(outil: Outil): Observable<Outil> {
  return this.http.post<Outil>(this.baseUrl, outil);
}


  update(id: string, outil: Outil): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, outil);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
