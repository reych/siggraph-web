import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';

// Modules
import { AdminModule } from './admin/admin.module';
import { FacadeModule } from './facade/facade.module';

// Components
import { AppComponent } from './app.component';

// Shared services, pipes
import { EventService, AboutService, GalleryService, SponsorService, ReversePipe } from './services/index';

// Firebase
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AdminModule,
    FacadeModule
    //AngularFireModule.initializeApp(environment.firebase),
    //AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    //AngularFireAuthModule // imports firebase/auth, only needed for auth features
  ],
  providers: [ EventService, AboutService, GalleryService, SponsorService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
