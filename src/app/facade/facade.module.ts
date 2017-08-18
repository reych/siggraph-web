import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { FacadeComponent } from './facade.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutComponent } from './about/about.component';
import { SponsorsComponent } from './sponsors/sponsors.component';

// Routes
import { FacadeRoutingModule} from './facade-routing.module';
import { GalleryDetailComponent } from './gallery/gallery-detail/gallery-detail.component'

@NgModule({
  imports: [
    CommonModule,
    FacadeRoutingModule
  ],
  declarations: [
      FacadeComponent,
      HomeComponent,
      AboutComponent,
      EventsComponent,
      GalleryComponent,
      SponsorsComponent,
      GalleryDetailComponent
  ]
})
export class FacadeModule { }
