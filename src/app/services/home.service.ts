import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Entry } from '../model/entry';
import { AuthService } from './auth.service';

@Injectable()
export class HomeService {

    private homeUrl = 'http://localhost:3000/api/home';

    // Request headers.
    private headers = new Headers({ 'Content-Type': 'application/json' });

    private authHeaders = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': this.authService.getCurrentAccessToken()
    });

    constructor( private http: Http, private authService: AuthService ) { }

    // Get About entries.
    getMission(): Promise<Entry[]> {
        const url = `${this.homeUrl}/mission/all`;
        return this.http.get(url)
            .toPromise()
            .then(res => res.json() as Entry[])
            .catch(this.handleError);
    }

    saveHighlight(entry: Entry):Promise<Entry> {
        if(entry.id) {
            return this.put(entry);
        } else {
            return this.postHighlight(entry);
        }
    }

    // Save entry, determine whether to create or update.
    saveMission(entry: Entry): Promise<Entry> {
        if(entry.id) {
            return this.put(entry);
        } else {
            return this.postMission(entry);
        }

    }

    // Get people.
    getHighlights(): Promise<Entry[]> {
        const url = `${this.homeUrl}/highlights/all`;
        return this.http.get(url)
            .toPromise()
            .then(res => res.json() as Entry[])
            .catch(this.handleError);
    }

    deleteHighlight(id: number): Promise<void> {
        const url = `${this.homeUrl}/r/highlights/delete/${id}`;
        return this.http.delete(url, {headers: this.authHeaders})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    /* ------------------------ [ Helper functions ] ------------------------ */
    // Create a new object of type T.
    private postHighlight(entry: Entry): Promise<Entry> {
        const url = `${this.homeUrl}/r/highlights/add`;
        return this.http
            .post(url, JSON.stringify(entry), {headers: this.authHeaders})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    // Create a new object of type T.
    private postMission(entry: Entry): Promise<Entry> {
        const url = `${this.homeUrl}/r/mission/add`;
        return this.http
            .post(url, JSON.stringify(entry), {headers: this.authHeaders})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    // Update object of type T.
    private put(entry: Entry): Promise<Entry> {
        const url = `${this.homeUrl}/r/any/update`;
        return this.http
            .put(url, JSON.stringify(entry), {headers: this.authHeaders})
            .toPromise()
            .then(() => entry)
            .catch(this.handleError);
    }

    // Error handler.
    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
