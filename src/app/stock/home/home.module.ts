import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';

import { IonicModule } from '@ionic/angular';
import { BorderCardDirective } from '../../core/directives/border-card.directive';
import { LoaderComponent } from "../../loader/loader.component";
import { SharedModule } from '../../shared/shared.module';
import { TruncatePipe } from '../../shared/truncate/truncate.pipe';
import { ButtonComponent } from "../button/button.component";
import { SearchComponent } from "../form/search/search.component";
import { HomeComponent } from './home.component';

@NgModule({
    declarations: [HomeComponent, TruncatePipe],
    imports: [
        IonicModule,
        CommonModule,
        SharedModule,
        HomeRoutingModule,
        BorderCardDirective,
        LoaderComponent,
        SearchComponent,
        ButtonComponent,
    ]
})
export class HomeModule {}
