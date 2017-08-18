import { Component, OnInit } from '@angular/core';

import { About } from '../../model/about';
import { Entry } from '../../model/entry';
import { Person } from '../../model/person';
import { AboutService } from '../../services/about.service';

//import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

//const URL = 'http://localhost:3000/api/uploads/';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    // Model.
    entryToEdit: Entry;
    personToEdit: Person;

    whatWeDo: Entry;
    contact: Entry;

    entries: Entry[];
    people: Person[];

    error: any;

    constructor( private aboutService: AboutService ) { }

    ngOnInit() {
        this.loadEntries();
        this.loadPeople();
    }

    /* ------------------------ [ Helper functions ] ------------------------ */
    // Load entries from database.
    private loadEntries() {
        console.log("loading entries");
        this.aboutService.getEntries()
        .then(
            entries => {
                this.entries = entries;
                if (entries.length >= 1) this.whatWeDo = entries[0];
                if (entries.length >= 2) this.contact = entries[1];
            },
            error =>  this.error = <any>error
        );
    }

    private loadPeople() {
        console.log("loading people");
        this.aboutService.getPeople()
        .then(
            people => this.people = people,
            error =>  this.error = <any>error
        );
    }

}
