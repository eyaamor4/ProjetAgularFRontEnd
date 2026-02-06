import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/services/member.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit {

  member: any;

  constructor(
    private memberService: MemberService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const authType = this.auth.getAuthType();
    const userId = this.auth.getUserId();

    console.log('🔍 Profile - authType:', authType);
    console.log('🔍 Profile - userId:', userId);

    if (authType === 'firebase') {
      this.memberService.getMemberByFirebase(userId).subscribe(m => {
        this.memberService.getFullMember(m.id).subscribe(full => {
          this.member = full;
        });
      });
    } 
    else {
      const memberIdNumber = Number(userId);
      this.memberService.getFullMember(memberIdNumber).subscribe(full => {
        this.member = full;
        console.log('✅ Membre chargé:', this.member);
      });
    }
  }
}