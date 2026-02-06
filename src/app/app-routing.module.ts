import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MemberComponent } from './member/member.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { EvtComponent } from './evt/evt.component';
import { LoginComponent } from './login/login.component';
import { PublicationComponent } from './publication/publication.component';
import { PublicationFormComponent } from './publication-form/publication-form.component';
import { ToolComponent } from './tool/tool.component';
import { ToolFormComponent } from './tool-form/tool-form.component';

import { MemberGuard } from './guards/member.guard';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { MemberPublicationsComponent } from './member-publications/member-publications.component';
import { MemberToolsComponent } from './member-tools/member-tools.component';
import { MemberEventsComponent } from './member-events/member-events.component';
const routes: Routes = [

  // PAGE D’ACCUEIL
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  // LOGIN
  { path: 'login', component: LoginComponent },

  // ADMIN
  {
    path: 'admin',
    children: [
      { path: 'members', component: MemberComponent },
      { path: 'members/create', component: MemberFormComponent },
      { path: 'members/:id/edit', component: MemberFormComponent },

      { path: 'publications', component: PublicationComponent },
      { path: 'publications/create', component: PublicationFormComponent },
      { path: 'publications/:id/edit', component: PublicationFormComponent },

      { path: 'tools', component: ToolComponent },
      { path: 'tools/create', component: ToolFormComponent },
      { path: 'tools/:id/edit', component: ToolFormComponent },

     

      { path: 'events', component: EvtComponent },

      { path: '', redirectTo: 'members', pathMatch: 'full' }
    ]
  },

  {
  path: 'member',
  canActivate: [MemberGuard],
  children: [
   { path: 'profile', component: MemberProfileComponent },
   

    { path: 'publications', component: MemberPublicationsComponent },

    { path: 'tools', component: MemberToolsComponent },
    { path: 'events', component: MemberEventsComponent }
  ]

},


  // DEFAULT
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
