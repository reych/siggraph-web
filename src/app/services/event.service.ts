import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Event } from '../model/event';

@Injectable()
export class EventService {
    // api URL.
    private eventsUrl = 'http://localhost:3000/api/events';

    // Request headers.
    private headers = new Headers({
        'Content-Type': 'application/json'
    })

    constructor( private http: Http ) { }

    // Get all events.
    getEvents(): Promise<Event[]> {
        const url = `${this.eventsUrl}/all`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as Event[])
            .catch(this.handleError);
    }

    // Save event.
    save(event: Event): Promise<Event>  {
        if (event.eventId) {
            console.log("Putting");
            return this.put(event);
        } else {
            console.log("Posting");
            return this.post(event);
        }
    }

    // Delete event.
    delete(eventId: number): Promise<void> {
        const url = `${this.eventsUrl}/delete/${eventId}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    /* ------------------------ [ Helper functions ] ------------------------ */
    // Add new event.
    private post(event: Event): Promise<Event> {
        const url = `${this.eventsUrl}/add`;
        return this.http
            .post(url, JSON.stringify(event), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }
    // Update existing event.
    private put(event: Event) {
        const url = `${this.eventsUrl}/update`;
        return this.http
            .put(url, JSON.stringify(event), {headers: this.headers})
            .toPromise()
            .then(() => event)
            .catch(this.handleError);
    }

    // Error handler.
    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
