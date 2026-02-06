import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {

  email = '';
  password = '';
  errorMsg = '';
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) {}

  // 🔥 NOTE : async ici
  async onLogin() {
    this.errorMsg = '';
    this.isLoading = true;
try {
      const ok = await this.auth.login(this.email, this.password);
      
      if (!ok) {
        this.errorMsg = 'Email ou mot de passe incorrect';
      }
      // Si ok = true, la redirection se fait automatiquement dans AuthService
    } catch (error) {
      this.errorMsg = 'Une erreur est survenue';
      console.error(error);
    } finally {
      this.isLoading = false; // ✅ Fin chargement
    }
  }
}
