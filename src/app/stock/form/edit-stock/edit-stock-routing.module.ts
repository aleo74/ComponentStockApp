import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../../core/guards/auth.guard';
import { EditStockComponent } from './edit-stock.component';

const routes: Routes = [
  {
    path: 'edit/:id',
    component: EditStockComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRoutingModule {}
