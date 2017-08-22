import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component'
import { PreviewAboutComponent, PreviewEventsComponent, PreviewSponsorsComponent,
    PreviewGalleryComponent, PreviewNewsComponent, PreviewHomeComponent } from './edit/index';
import { AuthGuard } from '../services/auth-guard.service';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
            { path: 'edithome', component: PreviewHomeComponent },
            { path: 'editabout', component: PreviewAboutComponent },
            { path: 'editevents', component: PreviewEventsComponent },
            { path: 'editsponsors', component: PreviewSponsorsComponent },
            { path: 'editgallery', component: PreviewGalleryComponent },
            { path: 'editnews', component: PreviewNewsComponent },
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
