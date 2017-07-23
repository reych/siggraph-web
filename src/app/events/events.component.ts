import { Component, OnInit } from '@angular/core';

import { Event } from '../model/event';
import { EditEventComponent } from './edit-event.component';
import { EventService } from '../utils/event.service';

let date = new Date().valueOf();
let updateTime = new Date().valueOf();

const EVENTS: Event[] = [
  { title: 'Event 1', date: date, time: "7:00", location: "ABC", content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', imageURL: "", updateTime: updateTime, eventId: 0},
  { title: 'Event 2', date: date, time: "7:00", location: "ABC", content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', imageURL: "", updateTime: updateTime, eventId: 1},
  { title: 'Event 3', date: date, time: "7:00", location: "ABC", content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', imageURL: "", updateTime: updateTime, eventId: 2}
];

@Component({
    selector: 'events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit{
    // State.
    editEvent: boolean = false;

    // Model.
    //events = EVENTS;
    events: Event[];
    eventToEdit: Event;

    error: any;

    constructor( private eventService: EventService ) { }

    ngOnInit() {
        this.loadEvents();
    }

    /* ------------------- [ Actions and Control state ] -------------------- */
    // Set state to open edit modal for an existing event.
    setUpdateEvent(event: Event) {
        this.editEvent = true;
        this.eventToEdit = event;
    }

    // Set state to open modal for a new event.
    setCreateEvent() {
        this.editEvent = true;
        this.eventToEdit = null;
    }

    // Set state to close modal window.
    close() {
        this.editEvent = false;
        this.loadEvents();
    }

    delete(eventId: number): void {
        this.eventService
        .delete(eventId)
        .then(() => {
            this.events = this.events.filter(event => event != event);
            this.loadEvents();
        });
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
