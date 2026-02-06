import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html'
})
export class TemplateComponent {

  constructor(
    public auth: AuthService,
    private router: Router
  ) {}

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  isAdmin() {
    const role = this.auth.getRole();
    console.log('🔍 Template - isAdmin check:', role);
    return role === 'ADMIN';
  }

  isMember() {
    const role = this.auth.getRole();
    console.log('🔍 Template - isMember check:', role);
    return role === 'MEMBRE' || role === 'TEACHER';
  }

  logout() {
    this.auth.logout();
  }

  goToProfile() {
    this.router.navigate(['/member/profile']);
  }

  getUserName() {
    const prenom = this.auth.getPrenom() || '';
    const nom = this.auth.getNom() || '';
    return `${prenom} ${nom}`.trim();
  }

  getRole() {
    return this.auth.getRole();
  }
}