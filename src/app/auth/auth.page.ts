import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLogin: boolean = false;
  isLoading: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  onAuthenticate(email: string, password: string) {
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
        //  let authObs: Observable<AuthResponseDara>;
        this.authService.signup(email, password).subscribe(
          (resData) => {
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/restaurant');
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

  onSwitchAuthMode(form: NgForm) {
    this.isLogin = !this.isLogin;
    form.resetForm();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.onAuthenticate(email, password);
    form.resetForm();
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
}
