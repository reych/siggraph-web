import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Person } from '../../../model/person';
import { AboutService } from '../../../services/about.service';
import { AuthService } from '../../../services/auth.service';

import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

const uploadURL = 'http://localhost:3000/api/about/r/image/upload';

@Component({
  selector: 'edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {

    @Input()
    person: Person

    @Output()
    close = new EventEmitter();

    error: any;

    // File upload.
    uploader:FileUploader = new FileUploader({url: uploadURL, authToken: this.authService.getCurrentAccessToken(), itemAlias: 'profile'});

    constructor( private aboutService: AboutService, private authService: AuthService ) { }

    ngOnInit() {
        this.initialize();
        this.setupFileUploader();
    }

    // Save person.
    save() {
        if(this.uploader.queue.length > 0) {
            this.upload();
        } else {
            this.savePerson();
        }

    }

    // Upload image.
    upload() {
        this.uploader.uploadAll();
    }

    closeWindow() {
        this.close.emit(event);
    }

    /* ------------------------ [ Helper functions ] ------------------------ */
    private savePerson() {
        this.aboutService
            .savePerson(this.person)
            .then(person => {
                this.person = person;
                this.closeWindow();
            })
            .catch(error => {
                this.error = error;
                this.closeWindow();
            })
    }

    private deleteImage(personId: number): Promise<void> {
        return this.aboutService.deleteImage(personId)
    }

    private initialize() {
        if (!this.person)
            this.person = new Person();
    }

    private setupFileUploader() {
        this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
            // Delete previous image
            if(this.person.imageURL) {
                this.deleteImage(this.person.id)
                    .then(() => {
                        // Update the user imageURL.
                        this.person.imageURL = 'profile-uploads/'+response;
                        this.savePerson();
                        alert(response);
                    });
            } else {
                // Update the user imageURL.
                this.person.imageURL = 'profile-uploads/'+response;
                this.savePerson();
            }


        };
    }

}
