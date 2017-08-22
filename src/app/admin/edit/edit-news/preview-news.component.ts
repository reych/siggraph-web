import { Component, OnInit } from '@angular/core';

import { Article } from '../../../model/article';
import { NewsService } from '../../../services/news.service';
import { DateHelper } from '../../../utils/datehelper';

@Component({
  selector: 'app-preview-news',
  templateUrl: './preview-news.component.html',
  styleUrls: ['./preview-news.component.css']
})
export class PreviewNewsComponent implements OnInit {

    // State.
    editArticle: boolean = false;

    // Model.
    news: Article[];
    articleToEdit: Article;

    error: any;

    constructor( private newsService: NewsService ) { }

    ngOnInit() {
        this.loadNews();
    }

    /* ------------------- [ Actions and Control state ] -------------------- */
    // Set state to open edit modal for an existing event.
    setEditArticle(article: Article) {
        this.editArticle = true;
        this.articleToEdit = article;
    }

    // Set state to close modal window.
    close() {
        this.editArticle = false;
        this.loadNews();
    }

    delete(id: number): void {
        this.newsService
        .delete(id)
        .then(() => {
            this.news = this.news.filter(article => article != article);
            this.loadNews();
        });
    }

    /* ------------------------ [ Utility functions ] ----------------------- */

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

    /* ------------------------ [ Helper functions ] ------------------------ */

    // Do initialization of variables here.
    private loadNews() {
        this.newsService
            .getNews()
            .then(
                news => this.news = news,
                error =>  this.error = <any>error
            );
    }

}
