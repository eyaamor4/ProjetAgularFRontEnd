import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Outil } from 'src/modeles/outil';
import { MemberService } from 'src/services/member.service';
import { ToolService } from 'src/services/tool.service';

@Component({
  selector: 'app-tool-form',
  templateUrl: './tool-form.component.html',
  styleUrls: ['./tool-form.component.css']
})
export class ToolFormComponent implements OnInit {

  form!: FormGroup;
  isEdit = false;
  currentId!: string;
  members: any[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private TS: ToolService,
    private MS: MemberService 
  ) {}

  ngOnInit(): void {
    this.currentId = this.route.snapshot.params['id'];
    this.isEdit = !!this.currentId;
    this.MS.GetAllMembers().subscribe(res => {
  this.members = res;
});


    this.form = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      nom: new FormControl('', Validators.required),
      description: new FormControl(''),
      technologie: new FormControl(''),
      lienSource: new FormControl('', Validators.required),
      dateCreation: new FormControl('', Validators.required),
      auteur: new FormControl(null, Validators.required) 
    });

    if (this.isEdit) {
      this.TS.getById(this.currentId).subscribe(outil => {
        this.form.patchValue(outil);
      });
    }
  }

  onSubmit() {
  if (this.form.invalid) return;

  const v = this.form.getRawValue();

  const outil: Omit<Outil, 'id'> = {
    nom: v.nom,
    description: v.description,
    technologie: v.technologie,
    lienSource: v.lienSource,
    dateCreation: v.dateCreation
  };

  if (this.isEdit) {
    this.TS.update(this.currentId, outil as Outil).subscribe(() => {
      this.router.navigate(['/admin/tools']);
    });
  } else {
    // 1️⃣ créer l’outil
    this.TS.add(outil).subscribe(created => {

      // 2️⃣ lier l’auteur (MEMBER microservice)
      this.MS.addOutilToMember(v.auteur, created.id).subscribe(() => {
        this.router.navigate(['/admin/tools']);
      });

    });
  }
}

}
