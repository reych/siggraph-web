import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Person } from '../model/person';
import { AboutService } from '../utils/about.service';

@Component({
  selector: 'edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {

    @Input()
    person: Person

    @Output()
    close = new EventEmitter();

    error: any;

    constructor( private aboutService: AboutService ) { }

    ngOnInit() {
        this.initialize();
    }

    // Save person.
    save() {
        this.aboutService
            .savePerson(this.person)
            .then(person => {
                this.person = person;
                this.closeWindow();
            })
            .catch(error => {
                this.error = error;
                this.closeWindow();
            })
    }

    closeWindow() {
        this.close.emit(event);
    }

    /* ------------------------ [ Helper functions ] ------------------------ */
    private initialize() {
        if (!this.person)
            this.person = new Person();
    }

}
