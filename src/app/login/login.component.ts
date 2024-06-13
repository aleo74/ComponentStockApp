import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { User } from '../core/class/user';
import { AuthService } from '../core/services/auth/auth.service';
import { ModalComponent } from '../shared/components/modal/modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private modalController: ModalController) {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  async presentErrorModal(message: string) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      componentProps: { message }
    });
    return await modal.present();
  }

  onSubmit() {
    this.authService.logging(this.user).subscribe({
      next: (isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigateByUrl('/home');
        }
      },
      error: (error) => {
        this.errorMessage = 'Login failed';
        this.presentErrorModal('Login failed: ' + error);
      }
    });
  }
}
