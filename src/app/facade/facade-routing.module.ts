import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { FacadeComponent } from './facade.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutComponent } from './about/about.component';
import { SponsorsComponent } from './sponsors/sponsors.component';

const facadeRoutes: Routes = [
  {
    path: '',
    component: FacadeComponent,
    children: [
      {
        path: '',
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'events', component: EventsComponent },
            { path: 'gallery', component: GalleryComponent },
            { path: 'about', component: AboutComponent },
            { path: 'sponsors', component: SponsorsComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(facadeRoutes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class FacadeRoutingModule { }
