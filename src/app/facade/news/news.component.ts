import { Component, OnInit } from '@angular/core';
import { Article } from '../../model/article';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

    news: Article[];
    error: any;

    constructor( private newsService: NewsService ) { }

    ngOnInit() {
        this.loadNews();
    }


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
