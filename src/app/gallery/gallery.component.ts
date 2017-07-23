import { Component } from '@angular/core';

const IMAGES: string[] = ['../assets/fox.png', '../assets/fox.png', '../assets/fox.png'];

@Component({
    selector: 'gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
    images = IMAGES;
}
