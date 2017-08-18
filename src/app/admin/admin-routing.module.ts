import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component'
import { PreviewAboutComponent, PreviewEventsComponent, PreviewSponsorsComponent, PreviewGalleryComponent } from './edit/index';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'editabout', component: PreviewAboutComponent },
          { path: 'editevents', component: PreviewEventsComponent },
          { path: 'editsponsors', component: PreviewSponsorsComponent },
          { path: 'editgallery', component: PreviewGalleryComponent },
          { path: '', component: PreviewAboutComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
