import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facade',
  templateUrl: './facade.component.html',
  styleUrls: ['./facade.component.css']
})
export class FacadeComponent implements OnInit {

    current: string = "home"

    constructor() { }

    ngOnInit() {
    }

    select(name: string) {
        this.current = name;
    }



}
