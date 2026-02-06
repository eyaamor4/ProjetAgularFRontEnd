import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicationService } from 'src/services/publication.service';
import { MemberService } from 'src/services/member.service';
import { Publication } from 'src/modeles/publication';


@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.css']
})
export class PublicationFormComponent implements OnInit {

  form!: FormGroup;
  isEdit = false;
  members: any[] = [];
  pdfUrl: string | null = null;
  currentId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pubService: PublicationService,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {

    // 1️⃣ Charger tous les membres
    this.memberService.GetAllMembers().subscribe(res => {
      this.members = res;
    });

    // 2️⃣ Récupérer l'id
    this.currentId = Number(this.route.snapshot.params['id']);
    this.isEdit = !!this.currentId;

    // 3️⃣ Initialiser le formulaire
    this.form = new FormGroup({
      type: new FormControl('', Validators.required),
      titre: new FormControl('', Validators.required),
      dateApparition: new FormControl('', Validators.required),
      lien: new FormControl(null),
      auteurs: new FormControl([]),
      sourcePdf: new FormControl(null)
    });

    // 4️⃣ MODE MODIFICATION
    if (this.isEdit) {

      this.pubService.getById(this.currentId.toString()).subscribe(pub => {
        this.form.patchValue({
          type: pub.type,
          titre: pub.titre,                 // ✅ CORRIGÉ
          dateApparition: pub.dateApparition,         // ✅ mapping correct
          lien: pub.lien,
          sourcePdf: pub.sourcePdf
        });

        this.pdfUrl = pub.sourcePdf || null;
      });

      // charger les auteurs
      this.memberService
        .getAuteursByPublication(this.currentId)
        .subscribe(auteurs => {
          const auteurIds = auteurs.map(a => a.id);
          this.form.patchValue({ auteurs: auteurIds });
        });
    }
  }

uploadPdf(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  // ✅ ON ENVOIE UNIQUEMENT LE NOM
  this.form.patchValue({ sourcePdf: file.name });
}
onSubmit() {
  if (this.form.invalid) return;

  const formValue = this.form.value;
  const isoDate = new Date(formValue.dateApparition)
                    .toISOString()
                    .substring(0, 10);

  const publicationData = {
    type: formValue.type,
    titre: formValue.titre,
    dateApparition: isoDate,
    lien: formValue.lien,
    sourcePdf: formValue.sourcePdf
  };

  const auteurs: number[] = formValue.auteurs;

  // =========================
  // 🟢 CRÉATION
  // =========================
  if (!this.isEdit) {
    this.pubService.add(publicationData).subscribe(pub => {

      auteurs.forEach(idMembre => {
        this.memberService
          .addPublicationToMember(idMembre, pub.id)
          .subscribe();
      });

      this.router.navigate(['/admin/publications']);
    });
  }

  // =========================
  // 🟡 MODIFICATION
  // =========================
  else {
    this.pubService.update(this.currentId.toString(), publicationData)
      .subscribe(() => {

        // 1️⃣ supprimer anciens auteurs
        this.memberService
          .deleteAuteursByPublication(this.currentId)
          .subscribe(() => {

            // 2️⃣ ajouter les nouveaux auteurs
            this.memberService
              .updateAuteursPublication(this.currentId, auteurs)
              .subscribe(() => {
                this.router.navigate(['/admin/publications']);
              });

          });
      });
  }
}
}