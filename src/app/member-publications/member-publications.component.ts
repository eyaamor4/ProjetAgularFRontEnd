import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/services/member.service';
import { AuthService } from 'src/services/auth.service';
import { Publication } from 'src/modeles/publication';

@Component({
  selector: 'app-member-publications',
  templateUrl: './member-publications.component.html'
})
export class MemberPublicationsComponent implements OnInit {

  publications: Publication[] = [];

  constructor(
    private MS: MemberService,
    private auth: AuthService
  ) {}
ngOnInit() {

  // 🔑 ID MySQL du membre connecté
  const memberId = Number(localStorage.getItem('userId'));

  console.log('👤 Member MySQL ID =', memberId);

  if (!memberId) {
    console.warn('❌ Aucun membre MySQL connecté');
    return;
  }

  // ✅ récupérer ses publications
  this.MS.getFullMember(memberId).subscribe(full => {
    console.log('📚 Publications récupérées =', full.pubs);
    this.publications = full.pubs || [];
  });
}

}
