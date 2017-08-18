import { Component, OnInit, EventEmitter } from '@angular/core';

import { GalleryService } from '../../services/gallery.service'
import { GalleryPost } from '../../model/gallerypost';

const IMAGES: string[] = ['../assets/fox.png', '../assets/fox.png', '../assets/fox.png'];

@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
    // Data.
    images: GalleryPost[];
    selectedPost: GalleryPost = null;
    error: any;

    constructor( private galleryService: GalleryService ) { }

    ngOnInit() {
        this.loadImages();
    }

    setSelectedPost(post: GalleryPost) {
        this.selectedPost = post;
    }

    close() {
        this.selectedPost = null;
    }

    /* ------------------------ [ Helper functions ] ------------------------ */
    // Load GalleryPost objects.
    private loadImages() {
        this.galleryService
            .getAllPosts()
            .then(
                galleryPosts => this.images = galleryPosts,
                error =>  this.error = <any>error
            );
    }
}
