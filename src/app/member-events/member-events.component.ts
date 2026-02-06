import { Component, OnInit } from '@angular/core';
import { EvtService } from 'src/services/evt.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-member-events',
  templateUrl: './member-events.component.html',
  styleUrls: ['./member-events.component.css']
})
export class MemberEventsComponent implements OnInit {

  events: any[] = [];

  constructor(private ES: EvtService, private auth: AuthService) {}

  ngOnInit() {
    this.ES.getAllEvents().subscribe(res => {
      this.events = res; // pas de filtre possible
    });
  }
}
