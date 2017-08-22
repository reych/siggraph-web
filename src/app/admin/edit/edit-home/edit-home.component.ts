import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Entry } from '../../../model/entry';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'edit-home',
  templateUrl: './edit-home.component.html',
  styleUrls: ['./edit-home.component.css']
})
export class EditHomeComponent implements OnInit {

    private EDIT_MISSION = 1;
    private EDIT_HIGHLIGHT = 2;
    private EDIT_NULL = 0;

    @Input()
    entry: Entry;

    @Input()
    type: number;

    @Output()
    close = new EventEmitter();

    // Model.
    error: any;

  constructor( private homeService: HomeService ) { }

  ngOnInit() {
      this.initialize();
  }

  /* ------------------------- [ Actions ] -------------------------- */
  // Save the Entry to database and close window.
  save() {
      console.log("Saving...");
      if(!this.entry.id) {
          console.log("Saving new entry");
      }
      if (this.type == this.EDIT_MISSION) {
          this.homeService
              .saveMission(this.entry)
              .then(entry => {
                  this.entry = entry;
                  console.log(entry.title);
                  this.closeWindow();
              })
              .catch(error => {
                  this.error = error;
                  this.closeWindow();
              });
      } else if (this.type == this.EDIT_HIGHLIGHT) {
          this.homeService
              .saveHighlight(this.entry)
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
