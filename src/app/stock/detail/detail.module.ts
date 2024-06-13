import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoaderComponent } from "../../loader/loader.component";
import { SharedModule } from '../../shared/shared.module';
import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';

@NgModule({
    declarations: [DetailComponent, ],
    imports: [
        CommonModule,
        SharedModule,
        DetailRoutingModule,
        IonicModule,
        LoaderComponent // Assurez-vous que IonicModule est importé ici
    ]
})
export class DetailModule {}
