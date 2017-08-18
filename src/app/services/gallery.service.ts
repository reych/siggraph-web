import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { GalleryPost } from '../model/gallerypost'

@Injectable()
export class GalleryService {
    // api URL.
    private galleryUrl = 'http://localhost:3000/api/gallery';

    // Request headers.
    private headers = new Headers({
        'Content-Type': 'application/json'
    })

    constructor( private http: Http ) { }

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
        const url = `${this.galleryUrl}/delete/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    /* ------------------------ [ Helper functions ] ------------------------ */
    // Add new gallery post.
    private post(galleryPost: GalleryPost): Promise<GalleryPost> {
        const url = `${this.galleryUrl}/add`;
        return this.http
            .post(url, JSON.stringify(galleryPost), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }
    // Update existing gallery post.
    private put(galleryPost: GalleryPost): Promise<GalleryPost> {
        const url = `${this.galleryUrl}/update`;
        return this.http
            .put(url, JSON.stringify(galleryPost), {headers: this.headers})
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
