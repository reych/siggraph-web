import { Component, OnInit, EventEmitter } from '@angular/core';

import { GalleryService } from '../../../services/gallery.service'
import { GalleryPost } from '../../../model/gallerypost';

@Component({
  selector: 'app-preview-gallery',
  templateUrl: './preview-gallery.component.html',
  styleUrls: ['./preview-gallery.component.css']
})
export class PreviewGalleryComponent implements OnInit {

    // State.
    private editPost: boolean = false;

    // Data.
    images: GalleryPost[];
    selectedPost: GalleryPost = null;
    postToEdit: GalleryPost = null;
    error: any;

    constructor( private galleryService: GalleryService ) { }

    ngOnInit() {
        this.loadImages();
    }

    setSelectedPost(post: GalleryPost) {
        this.selectedPost = post;
    }

    setEditPost(post: GalleryPost) {
        this.postToEdit = post;
        this.editPost = true;
    }

    isEditPost(): boolean {
        return this.editPost;
    }

    delete(id: number): void {
        this.galleryService
        .delete(id)
        .then(() => {
            this.images = this.images.filter(image => image != image);
            this.loadImages();
        });
    }

    close() {
        this.postToEdit = null;
        this.editPost = false;
        this.loadImages();
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
