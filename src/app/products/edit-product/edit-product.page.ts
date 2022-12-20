import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  handlerMessage = '';
  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  async onGoBack() {
    const alert = await this.alertController.create({
      header: 'Please confirm!',
      message: 'Are you sure you want to leave?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
            this.router.navigate(['/products']);
            // this.form.reset();
          },
        },
      ],
    });
    await alert.present();
    await alert.onDidDismiss();
  }
}
