import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Event } from '../../../model/event';
import { EventService } from '../../../services/event.service';

import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';

@Component({
    selector: 'edit-event',
    templateUrl: './edit-event.component.html',
    styleUrls: ['./edit-event.component.css']
})

export class EditEventComponent implements OnInit{
    @Input()
    event: Event;

    @Output()
    close = new EventEmitter();

    // Model
    proxyEvent: Event; // Update this event until it's time to save.
    heading: string;
    error: any;
    quote: string;
    private dateModel: Object;

    // Datepicker configurations.
    private myOptions: INgxMyDpOptions = {
        dateFormat: 'dd mm yyyy'
    };

    constructor(
        private eventService: EventService
    ){ }

    ngOnInit() {
        this.initialize();
    }

    /* ------------------------- [ Actions ] -------------------------- */
    // Save the Event.
    save() {
        console.log("Saving...");
        // Update model.
        this.copyValuesFromProxy();
        // Call EventService to save to database.
        if(!this.event.eventId) {
            console.log("Saving new event");
        }
        this.eventService
            .save(this.event)
            .then(event => {
                this.event = event;
                console.log(event.title);
                this.closeWindow();
            })
            .catch(error => {
                this.error = error;
                this.closeWindow();
            });

    }

    // Date changed callback.
    onDateChanged(event: IMyDateModel): void {
        //  Convert to Date object.
        this.proxyEvent.date = event.jsdate.valueOf();
    }

    // Close window.
    closeWindow() {
        this.close.emit(event);
    }

    /* ------------------------ [ Helper functions ] ------------------------ */
    private initialize() {
        // Initialize proxy event.
        this.proxyEvent = new Event();

        // Create new event.
        if(!this.event) {
            this.heading = "New Post";
            this.event = new Event();

            // Set datepicker.
            let currentDate = new Date();
            this.dateModel = {date: {year: currentDate.getFullYear(), month: currentDate.getMonth(), day: currentDate.getDate()}};
            this.proxyEvent.date = currentDate.valueOf();
        }
        // Load old event.
        else {
            this.copyValuesToProxy();
            this.heading = "Edit Post";
            let eventDate = new Date(this.event.date);
            this.dateModel = {date: {year: eventDate.getFullYear(), month: eventDate.getMonth(), day: eventDate.getDate()}};
        }
    }

    private copyValuesToProxy() {
        this.proxyEvent.title = this.event.title;
        this.proxyEvent.date = this.event.date;
        this.proxyEvent.time = this.event.time;
        this.proxyEvent.location = this.event.location;
        this.proxyEvent.content = this.event.content;
        this.proxyEvent.imageURL = this.event.imageURL;
        this.proxyEvent.link = this.event.link;
    }
    private copyValuesFromProxy() {
        this.event.title = this.proxyEvent.title;
        this.event.date = this.proxyEvent.date;
        this.event.time = this.proxyEvent.time;
        this.event.location = this.proxyEvent.location;
        this.event.content = this.proxyEvent.content;
        this.event.imageURL = this.proxyEvent.imageURL;
        this.event.link = this.proxyEvent.link;
    }
}
