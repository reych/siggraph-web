import { Component, OnInit } from '@angular/core';

import { Entry } from '../../../model/entry';
import { Person } from '../../../model/person';
import { AboutService } from '../../../services/about.service';

@Component({
  selector: 'app-preview-about',
  templateUrl: './preview-about.component.html',
  styleUrls: ['./preview-about.component.css']
})
export class PreviewAboutComponent implements OnInit {

    // State.
    //private editEntry: boolean = false;
    private EDIT_ENTRY = 1;
    private EDIT_PERSON = 2;
    private EDIT_NULL = 0;

    private editState: number = this.EDIT_NULL;

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

    // Delete the person.
    deletePerson(id: number) {
        this.aboutService
        .deletePerson(id)
        .then(() => {
            this.people = this.people.filter(person => person != person);
            this.loadPeople();
        })
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
                if (entries.length == 0) {
                    this.whatWeDo = new Entry();
                    this.whatWeDo.title = "What we do";
                    this.contact = new Entry();
                    this.contact.title = "Contact";

                    this.aboutService.saveEntry(this.whatWeDo);
                    this.aboutService.saveEntry(this.contact);
                } else if (entries.length >= 2) {
                    this.whatWeDo = entries[0];
                    this.contact = entries[1];
                }
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
