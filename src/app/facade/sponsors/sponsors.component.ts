import { Component, OnInit } from '@angular/core';

import { Sponsor } from '../../model/sponsor';
import { SponsorService } from '../../services/sponsor.service';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit {

    sponsors: Sponsor[];
    error: any;
    message: string;

    constructor( private sponsorService: SponsorService ) { }

    ngOnInit() {
        this.loadSponsors();
    }

    /* ------------------------ [ Helper functions ] ------------------------ */

    // Do initialization of variables here.
    private loadSponsors() {
        this.sponsorService
            .getSponsors()
            .then(
                sponsors => {
                    this.sponsors = sponsors;
                    if (this.sponsors.length > 0) {
                        this.message = 'Thank you to all our sponsors!';
                    } else {
                        this.message = 'Be our sponsor!';
                    }
                },
                error =>  this.error = <any>error
            );
    }

}
