import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // Observable pour partager l'état de connexion
  private authStateSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  public authState$ = this.authStateSubject.asObservable();

  private apiUrl = 'http://localhost:9000/MEMBER/membres';

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  async login(email: string, password: string): Promise<boolean> {
    console.log('🔐 Tentative de connexion pour:', email);

    // 1️⃣ D'abord, essayer de se connecter avec MySQL (membres normaux)
    try {
      const membre: any = await firstValueFrom(
        this.http.get(`${this.apiUrl}/search/email?email=${email}`)
      );

      console.log('✅ Utilisateur trouvé dans MySQL:', membre);

      // Vérifier le mot de passe
      if (membre.password === password) {
        console.log('✅ Connexion MySQL réussie');
        return this.loginWithMySQL(membre);
      } else {
        console.log('❌ Mot de passe MySQL incorrect');
        return false;
      }

    } catch (mysqlError: any) {
      console.log('⚠️ Utilisateur non trouvé dans MySQL (code:', mysqlError.status, ')');
      console.log('🔄 Tentative de connexion Firebase pour admin...');
    }

    // 2️⃣ Si pas trouvé dans MySQL, essayer Firebase (admin uniquement)
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      if (!user) {
        console.log('❌ Pas d\'utilisateur Firebase');
        return false;
      }

      console.log('✅ Authentification Firebase réussie');

      // Récupérer les données depuis Firestore
      const snap = await this.firestore.collection('users').doc(user.uid).ref.get();
      
      if (!snap.exists) {
        console.log('❌ Document Firestore non trouvé');
        return false;
      }

      const data: any = snap.data();
      
      console.log('✅ Données Firestore récupérées:', data);
      console.log('✅ Connexion Firebase (Admin) réussie');
      
      return this.loginWithFirebase(user, data);

    } catch (firebaseError: any) {
      console.error('❌ Échec de connexion Firebase:', firebaseError.message);
      return false;
    }
  }

  // Connexion via MySQL (Membres et Enseignants)
  private loginWithMySQL(membre: any): boolean {
    localStorage.setItem('userId', membre.id.toString());
    localStorage.setItem('email', membre.email);
    localStorage.setItem('nom', membre.nom);
    localStorage.setItem('prenom', membre.prenom);
    localStorage.setItem('cin', membre.cin);
    localStorage.setItem('authType', 'mysql');
    
    // Déterminer le rôle en MAJUSCULES
    let role = 'MEMBRE';
    if (membre.grade) {
      role = 'TEACHER';
      localStorage.setItem('grade', membre.grade);
      localStorage.setItem('etablissement', membre.etablissement || '');
    } else if (membre.diplome) {
      role = 'MEMBRE';
      localStorage.setItem('diplome', membre.diplome);
    }
    
    localStorage.setItem('role', role);
    
    console.log('✅ Login MySQL - Rôle stocké:', role);
    console.log('📊 LocalStorage après login:', {
      userId: localStorage.getItem('userId'),
      role: localStorage.getItem('role'),
      nom: localStorage.getItem('nom'),
      prenom: localStorage.getItem('prenom')
    });
    
    // Notifier le changement d'état
    this.authStateSubject.next(true);
    
    // Navigation
    this.router.navigate(['/member/profile']);
    return true;
  }

  // Connexion via Firebase (Admin)
  private async loginWithFirebase(user: any, data: any): Promise<boolean> {
    const token = await user.getIdToken();
    
    localStorage.setItem('token', token);
    localStorage.setItem('userId', user.uid);
    localStorage.setItem('email', data.email || user.email);
    localStorage.setItem('nom', data.nom);
    localStorage.setItem('prenom', data.prenom);
    localStorage.setItem('role', data.role);
    localStorage.setItem('authType', 'firebase');
    
    console.log('✅ Login Firebase - Rôle stocké:', data.role);
    
    // Notifier le changement d'état
    this.authStateSubject.next(true);
    
    // Navigation selon le rôle
    if (data.role === 'ADMIN') {
      this.router.navigate(['/admin/members']);
    } else if (data.role === 'MEMBRE' || data.role === 'TEACHER') {
      this.router.navigate(['/member/profile']);
    } else {
      this.router.navigate(['/login']);
    }
    
    return true;
  }

  async logout() {
    const authType = localStorage.getItem('authType');
    
    // Si connecté via Firebase, se déconnecter de Firebase
    if (authType === 'firebase') {
      await this.afAuth.signOut();
    }
    
    localStorage.clear();
    
    // Notifier le changement d'état
    this.authStateSubject.next(false);
    
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('userId');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  getNom() {
    return localStorage.getItem('nom');
  }

  getPrenom() {
    return localStorage.getItem('prenom');
  }

  getUserId() {
    return localStorage.getItem('userId') || '';
  }

  isMember() {
    const role = this.getRole();
    return role === 'MEMBRE' || role === 'TEACHER';
  }

  isAdmin() {
    return this.getRole() === 'ADMIN';
  }

  getAuthType() {
    return localStorage.getItem('authType');
  }
  
}