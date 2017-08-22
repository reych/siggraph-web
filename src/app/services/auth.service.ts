import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
    isLoggedIn = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;
    loginUrl: string = 'http://localhost:3000/console';
    validateUrl: string = 'http://localhost:3000/validate';

    private headers = new Headers({
        'Content-Type': 'application/json'
    })

    constructor(private http: Http) { }

    getSession(username: string, password: string): Observable<any> {
        // http request
        const url = `${this.loginUrl}/login`;
        return this.http
            .post(url, JSON.stringify({username: username, password: password}), {headers: this.headers})
            .map(res => res.json())
            .do(val => {

                console.log("get session logged in");
                this.isLoggedIn = true;


            });
        //return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
    }

    checkSession(): Observable<boolean> {
        if (this.getCurrentAccessToken() != '') {
            // http request
            const url = `${this.loginUrl}/validate`;
            return this.http
                .post(url, JSON.stringify({access_token: this.getCurrentAccessToken()}), {headers: this.headers})
                .map(res => res.json())
                .do(val => {
                    console.log("check session logged in");
                    this.isLoggedIn = true;
                });
        } else {
            return Observable.of(false).do(val => this.isLoggedIn = false);
        }


    }

    logout(): void {
        this.isLoggedIn = false;
        localStorage.removeItem('access_token');
    }

    getCurrentAccessToken(): string {
        if (localStorage.getItem('access_token') === null) {
            return '';
        }
        return localStorage.getItem('access_token');
    }
}
