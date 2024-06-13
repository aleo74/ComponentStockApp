import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PageNotFoundComponent } from './components/';
import { ModalComponent } from './components/modal/modal.component';
import { WebviewDirective } from './directives/';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, ModalComponent],
  imports: [CommonModule, IonicModule, TranslateModule, FormsModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, ModalComponent]
})
export class SharedModule {}
