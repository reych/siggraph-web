import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { GalleryPost } from '../../../model/gallerypost';

@Component({
  selector: 'gallery-detail',
  templateUrl: './gallery-detail.component.html',
  styleUrls: ['./gallery-detail.component.css']
})
export class GalleryDetailComponent implements OnInit {
    @Input()
    images: GalleryPost[];

    @Input()
    currentPost: GalleryPost;

    @Output()
    close = new EventEmitter();

    index: number = 0;

    constructor() { }

    ngOnInit() {
        this.index = this.images.indexOf(this.currentPost);
    }

    nextImage() {
        if (this.index+1 < this.images.length) {
            this.index++;
        }
        this.currentPost = this.images[this.index];
    }

    previousImage() {
        if (this.index-1 >= 0) {
            this.index--;
        }
        this.currentPost = this.images[this.index];
    }

    closeWindow() {
        this.close.emit(event);
    }

}
