import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-button-tag',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './button-tag.component.html'
})
export class ButtonTagComponent {
 constructor(private router: Router) { }

 addTag() {
  this.router.navigate(['tag/add']);
 }
}
