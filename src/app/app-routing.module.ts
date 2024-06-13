import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { ConfigHomeRoutingModule } from './configurations/config-home/config-home-routing.module';
import { LoginComponent } from "./login/login.component";
import { DetailRoutingModule } from './stock/detail/detail-routing.module';
import { AddRoutingModule } from './stock/form/add-stock/add-stock-routing.module';
import { EditRoutingModule } from './stock/form/edit-stock/edit-stock-routing.module';
import { HomeRoutingModule } from './stock/home/home-routing.module';
import { AddTagRoutingModule } from './tags/form/add-tag/add-tag-routing.module';
import { EditTagRoutingModule } from './tags/form/edit-tag/edit-tag-routing.module';
import { TagsListRoutingModule } from './tags/list/tag-list-routing.module';
import { TagDetailRoutingModule } from './tags/tag-detail/tag-detail-routing.module';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {path: "login", component: LoginComponent},
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {}),
    HomeRoutingModule,
    DetailRoutingModule,
    AddRoutingModule,
    AddTagRoutingModule,
    EditRoutingModule,
    ConfigHomeRoutingModule,
    TagsListRoutingModule,
    TagDetailRoutingModule,
    EditTagRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
