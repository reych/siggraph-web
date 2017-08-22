import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Article } from '../../../model/article';
import { NewsService } from '../../../services/news.service';

import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

const uploadURL = 'http://localhost:3000/api/news/image/upload';

@Component({
  selector: 'edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {

    @Input()
    article: Article

    @Output()
    close = new EventEmitter();

    error: any;

    // File upload.
    uploader:FileUploader = new FileUploader({url: uploadURL, itemAlias: 'article'});

    constructor( private newsService: NewsService ) { }

    ngOnInit() {
        this.initialize();
        this.setupFileUploader();
    }

    // Save person.
    save() {
        this.saveArticle();
        // if(this.uploader.queue.length > 0) {
        //     this.upload();
        // } else {
        //     this.saveArticle();
        // }

    }

    // Upload image.
    upload() {
        this.uploader.uploadAll();
    }

    closeWindow() {
        this.close.emit(event);
    }

    /* ------------------------ [ Helper functions ] ------------------------ */
    // Format dateString into [month day, year]
    formatDate(dateString): string {
        let date = new Date(dateString);
        let monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];

        let day = date.getDate();
        let monthIndex = date.getMonth();
        let year = date.getFullYear();

        return monthNames[monthIndex] + ' ' + day + ', ' + year;
    }

    private saveArticle() {
        this.newsService
            .saveArticle(this.article)
            .then(article => {
                this.article = article;
                this.closeWindow();
            })
            .catch(error => {
                this.error = error;
                this.closeWindow();
            })
    }

    deleteImage(articleId: number): Promise<void> {
        return this.newsService.deleteImage(articleId)
    }

    private initialize() {
        if (!this.article)
            this.article = new Article();
    }

    private setupFileUploader() {
        this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
            // Delete previous image
            if(this.article.imagePath) {
                this.deleteImage(this.article.id)
                    .then(() => {
                        // Update the article imagepath.
                        this.article.imagePath= 'news-uploads/'+response;
                        this.saveArticle();
                        alert(response);
                    });
            } else {
                // Update the article imagePath.
                this.article.imagePath = 'news-uploads/'+response;
                this.saveArticle();
            }


        };
    }

}
