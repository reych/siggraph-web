import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Article } from '../model/article';
import { AuthService } from './auth.service';

@Injectable()
export class NewsService {

  private newsUrl = 'http://localhost:3000/api/news';

  // Request headers.
  private headers = new Headers({ 'Content-Type': 'application/json' });

  private authHeaders = new Headers({
      'Content-Type': 'application/json',
      'x-access-token': this.authService.getCurrentAccessToken()
  });

  constructor( private http: Http, private authService: AuthService ) { }

  // Get all news articles.
  getNews(): Promise<Article[]> {
      const url = `${this.newsUrl}/all`;
      return this.http.get(url)
          .toPromise()
          .then(res => res.json() as Article[])
          .catch(this.handleError);
  }

  // Get the first ten news.
  // getRecentNews(): Promise<Article[]> {
  //
  // }

  // Save article, determine whether to create or update.
  saveArticle(article: Article): Promise<Article> {
      if(article.id) {
          return this.put(article);
      } else {
          return this.post(article);
      }

  }

  // Delete the image of article with articleId.
  deleteImage(articleId: number): Promise<void> {
      const url = `${this.newsUrl}/r/image/delete/${articleId}`;
      return this.http.delete(url, {headers: this.authHeaders})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
  }

    delete(id: number) {
        const url = `${this.newsUrl}/r/delete/${id}`;
        return this.http.delete(url, {headers: this.authHeaders})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);


    }

  /* ------------------------ [ Helper functions ] ------------------------ */
  // Create a new article.
  private post(article: Article): Promise<Article> {
      const url = `${this.newsUrl}/r/add`;
      return this.http
          .post(url, JSON.stringify(article), {headers: this.authHeaders})
          .toPromise()
          .then(res => res.json())
          .catch(this.handleError);
  }

  // Update article.
  private put(article: Article): Promise<Article> {
      const url = `${this.newsUrl}/r/update`;
      return this.http
          .put(url, JSON.stringify(article), {headers: this.authHeaders})
          .toPromise()
          .then(() => article)
          .catch(this.handleError);
  }



  // Error handler.
  private handleError(error: any) {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }

}
