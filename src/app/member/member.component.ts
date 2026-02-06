import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Member } from 'src/modeles/member';
import { MemberService } from 'src/services/member.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit{
//classe du composant 
dataSource: Member[] = [];
 //inhection de dependence permet d'injecter un service ou plusieur service dans un composant ou dans un autre service
 //consiste a cree une instance prive du service dans le composant a condition que le service accepte a etre injecte  
 constructor(private MS:MemberService, private dialog:MatDialog){} 
fetch(){
  this.MS.GetAllMembers().subscribe((x)=>{this.dataSource=x})

}

 ngOnInit(){
  this.fetch()
 }

displayedColumns: string[] = [
  'photo',
  'id',
  'cin',
  'nom',
  'prenom',
  'email',
  'grade',
  'etablissement',
  'encadreur',
  'dateInscription',
  'diplome',
  'cv',
  'action'
];



delete(id:string){
//ouvrir la boite 
  let dialogRef = this.dialog.open(ConfirmDialogComponent, {
    height: '400px',
    width: '600px',
  });
//attendre click user
//click=>confirmation
dialogRef.afterClosed().subscribe((res)=>{
  if (res){
    //this.MS.deleteMemberById(id).subscribe(()=>{this.fetch()})
    this.MS.deleteMemberById(id).subscribe(()=>{this.fetch()})

  }
})


}
getEncadreurName(id: string) {
  if (!id) return '—';
  const enc = this.dataSource.find(m => m.id === id);
  return enc ? `${enc.nom} ${enc.prenom}` : '—';
}
getMemberById(id: number) {
return this.MS.getMemberById(id.toString());
}




}
