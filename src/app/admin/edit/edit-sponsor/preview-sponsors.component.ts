import { Component, OnInit } from '@angular/core';

import { Sponsor } from '../../../model/sponsor';
import { SponsorService } from '../../../services/sponsor.service';

@Component({
  selector: 'app-preview-sponsors',
  templateUrl: './preview-sponsors.component.html',
  styleUrls: ['./preview-sponsors.component.css']
})
export class PreviewSponsorsComponent implements OnInit {

    // State.
    editSponsor: boolean = false;

    // Model.
    sponsors: Sponsor[];
    sponsorToEdit: Sponsor;

    error: any;

    constructor( private sponsorService: SponsorService ) { }

    ngOnInit() {
        this.loadSponsors();
    }

    /* ------------------- [ Actions and Control state ] -------------------- */
    // Set state to open edit modal for an existing event.
    setUpdateSponsor(sponsor: Sponsor) {
        this.editSponsor = true;
        this.sponsorToEdit = sponsor;
    }

    // Set state to open modal for a new event.
    setCreateSponsor() {
        this.editSponsor = true;
        this.sponsorToEdit = null;
    }

    // Set state to close modal window.
    close() {
        this.editSponsor = false;
        this.loadSponsors();
    }

    delete(id: number): void {
        this.sponsorService
        .delete(id)
        .then(() => {
            this.sponsors = this.sponsors.filter(sponsor => sponsor != sponsor);
            this.loadSponsors();
        });
    }

    /* ------------------------ [ Helper functions ] ------------------------ */

    // Do initialization of variables here.
    private loadSponsors() {
        this.sponsorService
            .getSponsors()
            .then(
                sponsors => this.sponsors = sponsors,
                error =>  this.error = <any>error
            );
    }

}
