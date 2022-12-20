import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {
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
