import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MemberGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.auth.getRole();
    const isLogged = this.auth.isLoggedIn();

    if (!isLogged) {
      this.router.navigate(['/login']);
      return false;
    }

    if (role === 'MEMBRE' || role === 'TEACHER') {
      return true;
    }

    this.router.navigate(['/dashboard']);
    return false;
  }
}
