import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from 'src/modeles/publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private URL = "http://localhost:9000/PUBLICATION/publications";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.URL);
  }

  getById(id: string): Observable<Publication> {
    return this.http.get<Publication>(`${this.URL}/${id}`);
  }

 add(pub: Publication): Observable<Publication> {
  return this.http.post<Publication>(this.URL, pub);
}

update(id: string, pub: Publication): Observable<Publication> {
  return this.http.put<Publication>(`${this.URL}/${id}`, pub);
}


  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }
 

}
