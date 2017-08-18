import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'admin',
        loadChildren: 'app/admin/admin.module#AdminModule'
    },
    {
        path: '',
        loadChildren: 'app/facade/facade.module#FacadeModule'
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}
