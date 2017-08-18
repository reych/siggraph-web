import { Component, OnInit } from '@angular/core';

import { Event } from '../../model/event';
import { EventService } from '../../services/event.service';

let date = new Date().valueOf();
let updateTime = new Date().valueOf();

@Component({
    selector: 'events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{

    events: Event[];
    error: any;

    constructor( private eventService: EventService ) { }

    ngOnInit() {
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

    // Do initialization of variables here.
    private loadEvents() {
        this.eventService
            .getEvents()
            .then(
                events => this.events = events,
                error =>  this.error = <any>error
            );
    }

}
