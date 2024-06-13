import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../../core/guards/auth.guard';
import { AddTagComponent } from './add-tag.component';

const routes: Routes = [
  {
    path: 'tag/add',
    component: AddTagComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddTagRoutingModule {}