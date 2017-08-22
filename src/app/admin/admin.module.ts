import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { AdminComponent } from './admin.component';
import { EditAboutComponent, EditPersonComponent, EditEventComponent,
    EditSponsorComponent, EditGalleryPostComponent, EditNewsComponent, EditHomeComponent,
    PreviewAboutComponent, PreviewEventsComponent, PreviewSponsorsComponent,
    PreviewGalleryComponent, PreviewNewsComponent, PreviewHomeComponent } from './edit/index';

// Routing
import { AdminRoutingModule } from './admin-routing.module';

// External Libraries
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    NgxMyDatePickerModule
  ],
  declarations: [
      AdminComponent,
      EditAboutComponent,
      EditPersonComponent,
      EditEventComponent,
      EditSponsorComponent,
      EditGalleryPostComponent,
      FileSelectDirective,
      PreviewAboutComponent,
      PreviewEventsComponent,
      PreviewGalleryComponent,
      PreviewSponsorsComponent,
      EditNewsComponent,
      PreviewNewsComponent,
      EditHomeComponent,
      PreviewHomeComponent
  ]
})
export class AdminModule { }
