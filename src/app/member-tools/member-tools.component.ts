import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/services/member.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-member-tools',
  templateUrl: './member-tools.component.html',
  styleUrls: ['./member-tools.component.css']
})
export class MemberToolsComponent implements OnInit {

  outils: any[] = [];

  constructor(
    private MS: MemberService,
    private auth: AuthService
  ) {}

  ngOnInit() {

    const authType = this.auth.getAuthType();

    // 🔵 CAS MEMBRE / ENSEIGNANT (MySQL)
    if (authType === 'mysql') {

      const memberId = Number(localStorage.getItem('userId'));
      console.log('🛠️ MySQL memberId =', memberId);

      if (!memberId) return;

      this.MS.getFullMember(memberId).subscribe(full => {
        console.log('🔧 outils récupérés =', full.outils);
        this.outils = full.outils || [];
      });
    }

    // 🔴 CAS ADMIN (Firebase)
    if (authType === 'firebase') {
      console.log('ADMIN connecté — pas d’outils personnels');
      this.outils = [];
    }
  }
}
