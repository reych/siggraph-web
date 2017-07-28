import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { GalleryPost } from '../model/gallerypost';
import { GalleryService } from '../utils/gallery.service';

import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

const uploadURL = 'http://localhost:3000/api/gallery/image/upload';

@Component({
    selector: 'edit-gallery-post',
    templateUrl: './edit-gallery-post.component.html',
    styleUrls: ['./edit-gallery-post.component.css']
})

export class EditGalleryPostComponent implements OnInit{
    @Input()
    galleryPost: GalleryPost;

    @Output()
    close = new EventEmitter();

    // Model
    proxyGalleryPost: GalleryPost; // Update this post until it's time to save.
    heading: string;
    error: any;
    private dateModel: Object;

    // Datepicker configurations.
    private myOptions: INgxMyDpOptions = {
        dateFormat: 'dd mm yyyy'
    };

    // File uploader.
    uploader:FileUploader = new FileUploader({url: uploadURL, itemAlias: 'photo'});

    constructor(
        private galleryService: GalleryService
    ){ }

    ngOnInit() {
        this.initialize();
        this.setupFileUploader();
    }

    /* ------------------------- [ Actions ] -------------------------- */
    // upload the image, then save when upload succeeds.
    save() {
        if (!this.galleryPost.imageURL) {
            this.uploader.uploadAll();
        } else {
            this.savePost();
        }

    }

    // Date changed callback.
    onDateChanged(event: IMyDateModel): void {
        //  Convert to Date object.
        this.proxyGalleryPost.date = event.jsdate.valueOf();
    }

    // Close window.
    closeWindow() {
        this.close.emit(event);
    }

    /* ------------------------ [ Helper functions ] ------------------------ */
    private initialize() {
        // Initialize proxy event.
        this.proxyGalleryPost = new GalleryPost();

        // Create new event.
        if(!this.galleryPost) {
            this.heading = "New Post";
            this.galleryPost = new GalleryPost();

            // Set datepicker.
            let currentDate = new Date();
            this.dateModel = {date: {year: currentDate.getFullYear(), month: currentDate.getMonth(), day: currentDate.getDate()}};
            this.proxyGalleryPost.date = currentDate.valueOf();
        }
        // Load old event.
        else {
            this.copyValuesToProxy();
            this.heading = "Edit Post";
            let date = new Date(this.galleryPost.date);
            this.dateModel = {date: {year: date.getFullYear(), month: date.getMonth(), day: date.getDate()}};
        }
    }

    private setupFileUploader() {
        this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
            // Update the user imageURL.
            this.proxyGalleryPost.imageURL = 'gallery-uploads/'+response;
            console.log(this.galleryPost.imageURL);
            this.savePost();
            alert(response);
        };
    }

    private savePost() {
        console.log("Saving...");
        // Update model.
        this.copyValuesFromProxy();
        // Call GalleryService to save to database.
        if(!this.galleryPost.id) {
            console.log("Saving new event");
        }
        this.galleryService
            .save(this.galleryPost)
            .then(galleryPost => {
                this.galleryPost = galleryPost;
                console.log(galleryPost.title);
                this.closeWindow();
            })
            .catch(error => {
                this.error = error;
                this.closeWindow();
            });
    }

    private copyValuesToProxy() {
        this.proxyGalleryPost.title = this.galleryPost.title;
        this.proxyGalleryPost.eventName = this.galleryPost.eventName;
        this.proxyGalleryPost.date = this.galleryPost.date;
        this.proxyGalleryPost.caption = this.galleryPost.caption;
        this.proxyGalleryPost.imageURL = this.galleryPost.imageURL;
    }
    private copyValuesFromProxy() {
        this.galleryPost.title = this.proxyGalleryPost.title;
        this.galleryPost.eventName = this.proxyGalleryPost.eventName;
        this.galleryPost.date = this.proxyGalleryPost.date;
        this.galleryPost.caption = this.proxyGalleryPost.caption;
        this.galleryPost.imageURL = this.proxyGalleryPost.imageURL;
    }
}
