import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Entry } from '../model/entry';
import { AboutService } from '../utils/about.service';
import { Person } from '../model/person';

@Component({
  selector: 'edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css']
})
export class EditAboutComponent implements OnInit {
    @Input()
    entry: Entry;

    @Output()
    close = new EventEmitter();

    // Model.
    error: any;

  constructor( private aboutService: AboutService ) { }

  ngOnInit() {
      this.initialize();
  }

  /* ------------------------- [ Actions ] -------------------------- */
  // Save the Entry to database and close window.
  save() {
      console.log("Saving...");
      // Update model.
      //this.copyValuesFromProxy();
      // Call EventService to save to database.
      if(!this.entry.id) {
          console.log("Saving new entry");
      }
      this.aboutService
          .saveEntry(this.entry)
          .then(entry => {
              this.entry = entry;
              console.log(entry.title);
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

  // Edit mode create person.

  /* ------------------------ [ Helper functions ] ------------------------ */
  private initialize() {
      // If no entry, create new entry.
      if(!this.entry) {
          this.entry = new Entry();
      }
  }

}
