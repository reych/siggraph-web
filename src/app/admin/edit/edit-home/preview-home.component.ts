import { Component, OnInit } from '@angular/core';

import { Entry } from '../../../model/entry';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-preview-home',
  templateUrl: './preview-home.component.html',
  styleUrls: ['./preview-home.component.css']
})
export class PreviewHomeComponent implements OnInit {

    private EDIT_MISSION = 1;
    private EDIT_HIGHLIGHT = 2;
    private EDIT_NULL = 0;

    editState: number = this.EDIT_NULL;

    // Model.
    entryToEdit: Entry;

    mission: Entry;
    highlights: Entry[];
    error: any;

    constructor( private homeService: HomeService ) { }

    ngOnInit() {
        this.loadMission();
        this.loadHighlights();
    }

    setEditMission(entry: Entry) {
        this.editState = this.EDIT_MISSION;
        this.entryToEdit = entry;
    }

    setEditHighlight(entry: Entry) {
        this.editState = this.EDIT_HIGHLIGHT;
        this.entryToEdit = entry;
    }

    deleteHighlight(id: number) {
        this.homeService
            .deleteHighlight(id)
            .then(() => {
                this.highlights = this.highlights.filter(highlight => highlight != highlight);
                this.loadHighlights();
            })
    }

    isEdit() {
        return this.editState == this.EDIT_MISSION || this.editState == this.EDIT_HIGHLIGHT;
    }

    close() {
        this.disableEdit();
        this.loadMission();
        this.loadHighlights();
    }

    /* ------------------------ [ Helper functions ] ------------------------ */
    // Load mission from database.
    private loadMission() {
        console.log("loading mission");
        this.homeService.getMission()
        .then(
            entries => {
                if (entries.length == 0) {
                    this.mission = new Entry();
                    this.mission.title = "Mission Statement";

                    this.homeService.saveMission(this.mission);
                } else if (entries.length >= 1) {
                    this.mission = entries[0];
                }
            },
            error =>  this.error = <any>error
        );
    }

    // Load highlights from database.
    private loadHighlights() {
        console.log("loading highlights");
        this.homeService.getHighlights()
        .then(
            highlights => this.highlights = highlights,
            error =>  this.error = <any>error
        );
    }

    private disableEdit() {
        this.editState = this.EDIT_NULL;
    }

}
