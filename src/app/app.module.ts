import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent, EditEventComponent } from './events/index';
import { GalleryComponent } from './gallery/gallery.component';
import { AboutComponent, EditAboutComponent, EditPersonComponent } from './about/index';

// Shared services, pipes
import { EventService, AboutService, ReversePipe } from './utils/index';

// External Libraries
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

// Firebase
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRoutingModule } from './app-routing.module';
import { SponsorsComponent } from './sponsors/sponsors.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventsComponent,
    GalleryComponent,
    EditEventComponent,
    ReversePipe,
    AboutComponent,
    EditAboutComponent,
    SponsorsComponent,
    EditPersonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgxMyDatePickerModule
    //AngularFireModule.initializeApp(environment.firebase),
    //AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    //AngularFireAuthModule // imports firebase/auth, only needed for auth features
  ],
  providers: [EventService, AboutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
