import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { BorderCardDirective } from '../../core/directives/border-card.directive';
import { LoaderComponent } from "../../loader/loader.component";
import { SharedModule } from '../../shared/shared.module';
import { ButtonTagComponent } from '../button-tag/button-tag.component';
import { TagsListRoutingModule } from './tag-list-routing.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SharedModule,
        TagsListRoutingModule,
        BorderCardDirective,
        LoaderComponent,
        ButtonTagComponent,
    ]
})
export class TagsListModule {}
