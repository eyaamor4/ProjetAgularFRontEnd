import { Component, OnInit } from '@angular/core';
import { ToolService } from 'src/services/tool.service';
import { Outil } from 'src/modeles/outil';
import { MemberService } from 'src/services/member.service';


@Component({
  selector: 'app-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.css']
})
export class ToolComponent implements OnInit {

  dataSource: Outil[] = [];
  displayedColumns = [
  'id',
  'nom',
  'description',
  'technologie',
  'auteur',
  'dateCreation',
  'lienSource',
  'action'
];


  constructor(private TS: ToolService, private MS: MemberService ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.TS.getAll().subscribe(outils => {
      this.dataSource = outils;

      // 🔥 charger l’auteur pour chaque outil
      this.dataSource.forEach(o => {
        this.MS.getAuteursByOutil(o.id).subscribe(auteurs => {
  o.auteur = auteurs.length ? auteurs[0] : null;
});

      });
    });
  }
  getAuteur(o: any): string {
    if (!o.auteurs || o.auteurs.length === 0) return '—';
    return o.auteurs[0].nom + ' ' + o.auteurs[0].prenom;
  }


 delete(id: number) {
  this.TS.delete(id.toString()).subscribe(() => {
    this.dataSource = this.dataSource.filter(tool => tool.id !== id);
  });
}


}
