import { Component, OnInit } from '@angular/core';

import { About } from '../model/about';
import { Entry } from '../model/entry';
import { Person } from '../model/person';
import { AboutService } from '../utils/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    // State.
    //private editEntry: boolean = false;
    private EDIT_ENTRY = 1;
    private EDIT_PERSON = 2;
    private EDIT_NULL = 0;

    private editState: number = this.EDIT_NULL;

    // Model.
    //about: About;
    //proxyAbout: About;
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

    // Set entry to edit and edit state to true (Opens modal).
    setEditEntry(entry: Entry) {
        this.entryToEdit = entry;
        this.enableEditEntry();
    }

    // Set person to edit and edit state to true (Opens modal).
    setEditPerson(person: Person) {
        this.personToEdit = person;
        this.enableEditPerson();
    }

    // Returns true if in entry edit mode.
    isEditEntry(): boolean {
        return this.editState == this.EDIT_ENTRY;
    }

    // Returns true if in person edit mode.
    isEditPerson(): boolean {
        return this.editState == this.EDIT_PERSON;
    }

    // Set state to close modal window.
    close() {
        this.disableEdit();
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

    // Set edit state to edit entry.
    private enableEditEntry() {
        this.editState = this.EDIT_ENTRY;
    }

    // Set edit state to edit person.
    private enableEditPerson() {
        this.editState = this.EDIT_PERSON;
    }

    // Set edit state to false.
    private disableEdit() {
        this.editState = this.EDIT_NULL;
    }

}
