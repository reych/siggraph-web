import { Injectable}    from '@angular/core';
import { Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Sponsor } from '../model/sponsor';

@Injectable()
export class SponsorService {

  //API URL
  private sponsorsUrl = 'http://localhost:3000/api/sponsors';

  // Request headers
  private headers = new Headers({
      'Content-Type': 'application/json'
  })

  constructor(private http: Http) { }

  getSponsors(): Promise<Sponsor[]> {
    const url = `${this.sponsorsUrl}/all`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Sponsor[])
      .catch(this.handleError);
  }

  save(sponsor: Sponsor): Promise<Sponsor> {
    if(sponsor.id) {
      console.log("Putting");
      return this.put(sponsor);
    } else {
      console.log("Posting");
      return this.post(sponsor);
    }
  }
  // Delete sponsor.
  delete(id: number): Promise<void> {
      const url = `${this.sponsorsUrl}/r/delete/${id}`;
      return this.http.delete(url, {headers: this.headers})
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
  }

  /* ------------------------ [ Helper functions ] ------------------------ */
  // Add new sponsor
  private post(sponsor: Sponsor): Promise<Sponsor> {
    const url = `${this.sponsorsUrl}/r/add`;
    return this.http
        .post(url, JSON.stringify(sponsor), {headers: this.headers})
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
  }

  // Update existing sponsor.
  private put(sponsor:Sponsor) {
      const url = `${this.sponsorsUrl}/r/update`;
      return this.http
          .put(url, JSON.stringify(sponsor), {headers: this.headers})
          .toPromise()
          .then(() => sponsor)
          .catch(this.handleError);
  }

  // Error handler.
  private handleError(error: any) {
      console.error('An error occurred', error);
      return Promise.reject(error.message || error);
  }
}
