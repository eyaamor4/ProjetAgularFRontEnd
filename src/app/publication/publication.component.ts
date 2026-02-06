import { Component, OnInit } from '@angular/core';
import { PublicationService } from 'src/services/publication.service';
import { MemberService } from 'src/services/member.service';
import { Publication } from 'src/modeles/publication';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  dataSource: Publication[] = [];
  members: any[] = [];
displayedColumns = [
  'id',
  'type',
  'titre',
  'dateApparition',
  'sourcePdf',
   'auteurs',
  'action'
];



  constructor(private PS: PublicationService, private MS: MemberService) {}

ngOnInit() {
  this.PS.getAll().subscribe(pubs => {
    this.dataSource = pubs;

    // 🔥 charger les auteurs pour chaque publication
    this.dataSource.forEach(pub => {
      this.MS.getAuteursByPublication(pub.id).subscribe(auteurs => {
        (pub as any).auteurs = auteurs; // ajout dynamique
      });
    });
  });
}


getAuthorNames(auteurs: any[]): string {
  if (!auteurs || !auteurs.length) return '—';

  return auteurs
    .map(a => `${a.nom} ${a.prenom}`)
    .join(', ');
}


  delete(id: string) {
    this.PS.delete(id).subscribe(() => {
      this.PS.getAll().subscribe(p => this.dataSource = p);
    });
  }
}
