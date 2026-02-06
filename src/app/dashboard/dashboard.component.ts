import { Component, OnInit } from '@angular/core';
import { EvtService } from 'src/services/evt.service';
import { MemberService } from 'src/services/member.service';
import { PublicationService } from 'src/services/publication.service';
import { ToolService } from 'src/services/tool.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  nbMembers = 0;
  nbPublications = 0;
  nbEvents = 0;
  nbTools = 0;

  constructor(
    private MS: MemberService,
    private PS: PublicationService,
    private ES: EvtService,
    private TS: ToolService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.MS.GetAllMembers().subscribe(res => this.nbMembers = res.length);
    this.PS.getAll().subscribe(res => this.nbPublications = res.length);
    this.ES.getAllEvents().subscribe(res => this.nbEvents = res.length);
    this.TS.getAll().subscribe(res => this.nbTools = res.length);
  }
}
