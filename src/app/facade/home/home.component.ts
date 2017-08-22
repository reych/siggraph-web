import { Component } from '@angular/core';

import { Event } from '../../model/event';
import { Entry } from '../../model/entry';

import { EventService } from '../../services/event.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

    mission: Entry;
    highlights: Entry[];
    events: Event[];
    error: any;

    constructor( private eventService: EventService, private homeService: HomeService ) { }

    ngOnInit() {
        this.loadMission();
        this.loadHighlights();
        this.loadEvents();
    }

    /* ------------------------ [ Utility functions ] ----------------------- */

    // Format dateString into [month day, year]
    formatDate(dateString): string {
        let date = new Date(dateString);
      let monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];

      let day = date.getDate();
      let monthIndex = date.getMonth();
      let year = date.getFullYear();

      return monthNames[monthIndex] + ' ' + day + ', ' + year;
    }

    /* ------------------------ [ Helper functions ] ------------------------ */

    // Load recent events.
    private loadEvents() {
        this.eventService
            .getCurrentEvents()
            .then(
                events => this.events = events,
                error =>  this.error = <any>error
            );
    }

    private loadMission() {
        this.homeService
            .getMission()
            .then(
                missions => {
                    if (missions.length > 0) {
                        this.mission = missions[0];
                    }
                },
                error =>  this.error = <any>error
            );
    }

    private loadHighlights() {
        this.homeService
            .getHighlights()
            .then(
                highlights => this.highlights = highlights,
                error =>  this.error = <any>error
            );
    }

  content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

}
