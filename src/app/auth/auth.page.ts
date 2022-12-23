import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLogin: boolean = false;
  isLoading: boolean = false;
  showPassword: boolean = false;
  passwordToggleIcon: string = 'eye-off-outline';
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  onAuthenticate(email: string, password: string, form: NgForm): void {
    this.isLoading = true;
    // this.authService.login();
    this.loadingCtrl
      .create({
        keyboardClose: true,
        spinner: 'bubbles',
        message: 'Please wait...',
      })
      .then((loadingEl) => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        if (this.isLogin) {
          authObs = this.authService.login(email, password);
        } else {
          authObs = this.authService.signup(email, password);
        }
        authObs.subscribe(
          (resData) => {
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/restaurant');
            form.resetForm();
          },
          (errorResponse) => {
            loadingEl.dismiss();
            const code = errorResponse.error.error.message;
            let message = 'Could not sign you up, please try again.';
            if (code === 'EMAIL_EXISTS') {
              message = 'This email address exists already. Switch to login!';
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = 'E-Mail address could not be found.';
            } else if (code === 'INVALID_PASSWORD') {
              message = 'This password is not correct.';
            }
            this.showAlert(message);
          }
        );
      });
  }

  onSwitchAuthMode(form: NgForm, ionicButton) {
    this.isLogin = !this.isLogin;
    form.resetForm();
    if (ionicButton.fill == 'solid') {
      ionicButton.fill = 'outline';
    } else if (ionicButton.fill == 'outline') {
      ionicButton.fill = 'solid';
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.onAuthenticate(email, password, form);
  }

  private showAlert(message: string) {
    this.alertController
      .create({
        header: 'Authentication failed',
        message: message,
        buttons: [
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {},
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  onToggleEye(): void {
    this.showPassword = !this.showPassword;
    this.showPassword == false
      ? (this.passwordToggleIcon = 'eye-off-outline')
      : (this.passwordToggleIcon = 'eye-outline');
  }
}
