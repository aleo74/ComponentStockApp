import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../../core/guards/auth.guard';
import { AddStockComponent } from '../add-stock/add-stock.component';

const routes: Routes = [
  {
    path: 'stock/add',
    component: AddStockComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRoutingModule {}