import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MemberService } from 'src/services/member.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {

  form!: FormGroup;
  teachers: any[] = []; // liste des enseignants pour encadreur
  photoBase64: string = "";
  cvBase64: string = "";

  constructor(
    private MS: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
    cin: new FormControl(null, Validators.required),
    nom: new FormControl(null, Validators.required),
    prenom: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    dateNaissance: new FormControl(null, Validators.required),
    grade: new FormControl(null),
    etablissement: new FormControl(null),
    diplome: new FormControl(null), 
    type: new FormControl(null, Validators.required),
    encadreur: new FormControl(null),
  });
  this.form.get('type')?.valueChanges.subscribe(type => {
    if (type !== 'ens') {
      this.form.get('grade')?.disable();
      this.form.get('etablissement')?.disable();
      this.form.get('diplome')?.enable(); 
      
    } else {
      this.form.get('grade')?.enable();
      this.form.get('etablissement')?.enable();
      this.form.get('diplome')?.disable();
      
    }
  });

    // Charger la liste des enseignants
    this.MS.GetAllMembers().subscribe(m => {
      this.teachers = m.filter(item => item.type === "ens");
    });

    const idcourant = this.activatedRoute.snapshot.params['id'];

    if (idcourant) {
      this.MS.getMemberById(idcourant).subscribe(a => {
        this.photoBase64 = a.photo ?? "";
        this.cvBase64 = a.cv ?? "";

   this.form.patchValue({
  cin: a.cin,
  nom: a.nom,
  prenom: a.prenom,
  email: a.email,
  password: a.password,
  dateNaissance: a.dateNaissance,
  diplome: a.diplome ,
});

      });
    } 
  }

  // Convertir photo en base64
  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = () => this.photoBase64 = reader.result as string;
    reader.readAsDataURL(file);
  }

  // Convertir CV en base64
  onCvSelected(event: any) {
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = () => this.cvBase64 = reader.result as string;
    reader.readAsDataURL(file);
  }

onsub() {
  const idcourant = this.activatedRoute.snapshot.params['id'];
  const raw = this.form.getRawValue(); 
  const memberData: any = {
      id: idcourant,
      cin: raw.cin,
      nom: raw.nom,
      prenom: raw.prenom,
      email: raw.email,
      password: raw.password,
      dateNaissance: raw.dateNaissance,
      type: raw.type,
      cv: this.cvBase64 || null,
      photo: this.photoBase64 || null
    };
  if (raw.type === 'ens') {
      memberData.grade = raw.grade;
      memberData.etablissement = raw.etablissement;
    }
    if (raw.type === 'etd') {
  memberData.diplome = raw.diplome;
}


    if (raw.type === 'etd' && raw.encadreur) {
      memberData.encadrant = { id: raw.encadreur };
    }

 

  if (idcourant) {
    this.MS.updateMember(idcourant, memberData).subscribe(() => {
      
      this.router.navigate(['/admin/members']);
    });
  } else {
    this.MS.addMember(memberData).subscribe(() => {
      this.router.navigate(['/admin/members']);
    });
  }
}

}
