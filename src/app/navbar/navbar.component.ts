import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  islogged!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.islogged = isLoggedIn;
    });
  }

  returnHome() {
    this.router.navigate(['/']);
  }

  goConfig() {
    this.router.navigateByUrl('/config');
  }

  goToTag() {
    this.router.navigate(['/tags']);
  }

  logout() {
    this.authService.lougout();
    this.router.navigateByUrl('/login');
  }
}
