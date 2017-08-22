import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { GalleryPost } from '../model/gallerypost';
import { AuthService } from './auth.service';

@Injectable()
export class GalleryService {
    // api URL.
    private galleryUrl = 'http://localhost:3000/api/gallery';

    // Request headers.
    private headers = new Headers({
        'Content-Type': 'application/json'
    });

    private authHeaders = new Headers({
        'Content-Type': 'application/json',
        'x-access-token': this.authService.getCurrentAccessToken()
    });

    constructor( private http: Http, private authService: AuthService ) { }

    getAllPosts(): Promise<GalleryPost[]> {
        const url = `${this.galleryUrl}/all`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json() as GalleryPost[])
            .catch(this.handleError);
    }

    save(galleryPost: GalleryPost): Promise<GalleryPost>  {
        if (galleryPost.id) {
            console.log("Putting");
            return this.put(galleryPost);
        } else {
            console.log("Posting");
            return this.post(galleryPost);
        }
    }

    // Delete gallery post.
    delete(id: number): Promise<void> {
        const url = `${this.galleryUrl}/r/delete/${id}`;
        return this.http.delete(url, {headers: this.authHeaders})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    /* ------------------------ [ Helper functions ] ------------------------ */
    // Add new gallery post.
    private post(galleryPost: GalleryPost): Promise<GalleryPost> {
        const url = `${this.galleryUrl}/r/add`;
        return this.http
            .post(url, JSON.stringify(galleryPost), {headers: this.authHeaders})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }
    // Update existing gallery post.
    private put(galleryPost: GalleryPost): Promise<GalleryPost> {
        const url = `${this.galleryUrl}/r/update`;
        return this.http
            .put(url, JSON.stringify(galleryPost), {headers: this.authHeaders})
            .toPromise()
            .then(() => galleryPost)
            .catch(this.handleError);
    }

    // Error handler.
    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}
