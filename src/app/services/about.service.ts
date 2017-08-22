import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Entry } from '../model/entry';
import { Person } from '../model/person';
import { AuthService } from './auth.service';

@Injectable()
export class AboutService {
    private aboutUrl = 'http://localhost:3000/api/about';

    // Request headers.
    private headers = new Headers({ 'Content-Type': 'application/json' });

    private authHeaders = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': this.authService.getCurrentAccessToken()
    });

    constructor( private http: Http, private authService: AuthService ) { }

    // Get About entries.
    getEntries(): Promise<Entry[]> {
        const url = `${this.aboutUrl}/entries/all`;
        return this.http.get(url)
            .toPromise()
            .then(res => res.json() as Entry[])
            .catch(this.handleError);
    }

    // Save entry, determine whether to create or update.
    saveEntry(entry: Entry): Promise<Entry> {
        if(entry.id) {
            return this.put<Entry>(entry, 'r/entry/update');
        } else {
            return this.post<Entry>(entry, 'r/entry/add');
        }

    }

    // Get people.
    getPeople(): Promise<Person[]> {
        const url = `${this.aboutUrl}/people/all`;
        return this.http.get(url)
            .toPromise()
            .then(res => res.json() as Person[])
            .catch(this.handleError);
    }

    // Save person, determine whether to create or update.
    savePerson(person: Person): Promise<Person> {
        if(person.id) {
            return this.put<Person>(person, '/r/person/update');
        } else {
            return this.post<Person>(person, '/r/person/add');
        }

    }

    deleteImage(personId: number): Promise<void> {
        const url = `${this.aboutUrl}/r/image/delete/${personId}`;
        return this.http.delete(url, {headers: this.authHeaders})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    deletePerson(id: number): Promise<void> {
        const url = `${this.aboutUrl}/r/person/delete/${id}`;
        return this.http.delete(url, {headers: this.authHeaders})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    /* ------------------------ [ Helper functions ] ------------------------ */
    // Create a new object of type T.
    private post<T>(obj: T, endpoint: String): Promise<T> {
        const url = `${this.aboutUrl}/${endpoint}`;
        return this.http
            .post(url, JSON.stringify(obj), {headers: this.authHeaders})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    // Update object of type T.
    private put<T>(obj: T, endpoint: String): Promise<T> {
        const url = `${this.aboutUrl}/${endpoint}`;
        return this.http
            .put(url, JSON.stringify(obj), {headers: this.authHeaders})
            .toPromise()
            .then(() => obj)
            .catch(this.handleError);
    }



    // Error handler.
    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}
