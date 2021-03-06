import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Sponsor } from '../../../model/sponsor';
import { SponsorService } from '../../../services/sponsor.service';

import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';

@Component({
    selector: 'edit-sponsor',
    templateUrl: './edit-sponsor.component.html',
    styleUrls: ['./edit-sponsor.component.css']
})

export class EditSponsorComponent implements OnInit{
    @Input()
    sponsor: Sponsor;

    @Output()
    close = new EventEmitter();

    // Model
    proxySponsor: Sponsor; // Update this event until it's time to save.
    heading: string;
    error: any;
    quote: string;

    constructor(
        private sponsorService: SponsorService
    ){ }

    ngOnInit() {
        this.initialize();
    }

    /* ------------------------- [ Actions ] -------------------------- */
    // Save the Sponsor.
    save() {
        console.log("Saving...");
        // Update model.
        this.copyValuesFromProxy();
        // Call SponsorService to save to database.
        if(!this.sponsor.id) {
            console.log("Saving new sponsor");
        }
        this.sponsorService
            .save(this.sponsor)
            .then(sponsor => {
                this.sponsor = sponsor;
                console.log(sponsor.name);
                this.closeWindow();
            })
            .catch(error => {
                this.error = error;
                this.closeWindow();
            });

    }

    // Close window.
    closeWindow() {
        this.close.emit(event);
    }

    /* ------------------------ [ Helper functions ] ------------------------ */
    private initialize() {
        // Initialize proxy sponsor.
        this.proxySponsor = new Sponsor();

        // Create new sponsor.
        if(!this.sponsor) {
            this.heading = "New Sponsor";
            this.sponsor = new Sponsor();
        }
        // Load old sponsor.
        else {
            this.copyValuesToProxy();
            this.heading = "Edit Sponsor";
        }
    }

    private copyValuesToProxy() {
        this.proxySponsor.name = this.sponsor.name;
        this.proxySponsor.link = this.sponsor.link;
        this.proxySponsor.description = this.sponsor.description;
        this.proxySponsor.imagePath = this.sponsor.imagePath;
    }

    private copyValuesFromProxy() {
        this.sponsor.name = this.proxySponsor.name;
        this.sponsor.link = this.proxySponsor.link;
        this.sponsor.description = this.proxySponsor.description;
        this.sponsor.imagePath = this.proxySponsor.imagePath;
    }
}
