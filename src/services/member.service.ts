import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/modeles/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  //classe predefinie bech nesnaa menha instance 
  constructor(private httpClient:HttpClient ){}
 
 GetAllMembers():Observable<Member[]>
 {//envoie d'une requetehttp vers le backend
  return(this.httpClient.get<Member[]>("http://localhost:9000/MEMBER/membres"))
 }

addMember(x: Member): Observable<void> {
    // ✅ Détecte automatiquement si c'est un enseignant ou étudiant
    const endpoint = x.type === 'teacher' || x.grade 
      ? "http://localhost:9000/MEMBER/membres/enseignant"
      : "http://localhost:9000/MEMBER/membres/etudiant";
    
    return this.httpClient.post<void>(endpoint, x);
  }

 deleteMemberById(id :string){
  return (this.httpClient.delete<void>(`http://localhost:9000/MEMBER/membres/${id}`))
 }
 getMemberById(id:string):Observable <Member>{
  return (this.httpClient.get<Member>(`http://localhost:9000/MEMBER/membres/${id}`))
 }
 updateMember(id: string, member: any) {
  return this.httpClient.put(`http://localhost:9000/MEMBER/membres/${id}`, member);
}


findByEmailAndPassword(email: string, password: string) {
  return this.httpClient.get<Member[]>(`http://localhost:9000/MEMBER/membre?email=${email}&password=${password}`);
}
getFullMember(id: number) {
  return this.httpClient.get<any>(
    `http://localhost:9000/MEMBER/membres/${id}/full`
  );
}

update(id: string, data: any) {
  return this.httpClient.put(
    `http://localhost:9000/PUBLICATION/publications/${id}`,
  data
  );
}
addPublicationToMember(idMembre: number, idPub: number) {
  return this.httpClient.post(
    `http://localhost:9000/MEMBER/membres/${idMembre}/publications/${idPub}`,
    {}
  );
}
getAuteursByPublication(idPub: number) {
  return this.httpClient.get<any[]>(
    `http://localhost:9000/MEMBER/membres/publications/${idPub}/auteurs`
  );
}
getAuteursByOutil(idOutil: number) {
  return this.httpClient.get<any[]>(
    `http://localhost:9000/MEMBER/membres/outils/${idOutil}/auteurs`
  );
}


getMemberByFirebase(uid: string) {
  return this.httpClient.get<any>(
    `http://localhost:9000/MEMBER/membres/firebase/${uid}`
  );

}


addOutilToMember(idMembre: number, idOutil: number) {
  return this.httpClient.post(
    `http://localhost:9000/MEMBER/membres/${idMembre}/outils/${idOutil}`,
    {}
  );
}
updateAuteursPublication(idPub: number, auteurs: number[]) {
  return this.httpClient.put(
    `http://localhost:9000/MEMBER/membres/publications/${idPub}/auteurs`,
    auteurs
  );
}
deleteAuteursByPublication(idPub: number) {
  return this.httpClient.delete(
    `http://localhost:9000/MEMBER/membres/publications/${idPub}/auteurs`
  );
}

}
