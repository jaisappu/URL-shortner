import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UrlListComponent } from './components/url-list/url-list.component';


const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'short-urls', component: UrlListComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
