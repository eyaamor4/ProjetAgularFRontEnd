import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Evt } from 'src/modeles/evt';

@Injectable({
  providedIn: 'root'
})
export class EvtService {

  constructor(private HttpClient:HttpClient) { }
  getAllEvents():Observable<Evt[]>{
    return this.HttpClient.get<Evt[]>('http://localhost:9000/EVENEMENT/evenements')
  }

  addEvent (x:Evt):Observable <void/* void khater andich retour */>
  { return (this.HttpClient.post<void>('http://localhost:9000/EVENEMENT/evenements',x))}

  getEventById(id:string):Observable <Evt>{
    return (this.HttpClient.get<Evt>(`http://localhost:9000/EVENEMENT/evenements/${id}`))
   }
   updateEvent(x:Evt,id:string,):Observable<void>
   { return (this.HttpClient.put<void>(`http://localhost:9000/EVENEMENT/evenements/${id}`,x))}
   deleteEvent(id: string): Observable<void> {
  return this.HttpClient.delete<void>(`http://localhost:9000/EVENEMENT/evenements/${id}`);
}

}

