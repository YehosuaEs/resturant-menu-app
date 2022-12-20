import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductService } from './product.service';
import { Product } from './product.model';
import {
  AlertController,
  IonItemSliding,
  LoadingController,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit, OnDestroy {
  products: Product[];
  isLoading: boolean;
  private productsSub!: Subscription;

  constructor(
    private productService: ProductService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private router: Router
  ) {
    this.products = [];
    this.isLoading = false;
  }

  ngOnInit() {
    this.productsSub = this.productService.products.subscribe((products) => {
      this.products = products;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.productService.fetchPeoducts().subscribe(() => {
      this.isLoading = false;
    });
  }

  onEdit(productId: string, sliding: IonItemSliding) {
    sliding.close();
    this.router.navigate(['/', 'products', 'edit', productId]);
  }

  onDelete(productId: string, sliding: IonItemSliding) {
    sliding.close();

    this.loadingController
      .create({
        spinner: 'dots',
        message: 'Please wait! We are deleting this product',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.productService.deleteProduct(productId).subscribe(() => {
          loadingEl.dismiss();
          this.presentToast();
        });
      });
  }

  async onConfirmEditProduct(productId: string, sliding: IonItemSliding) {
    const alert = await this.alertController.create({
      header: 'Please confirm!',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            sliding.close();
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.onDelete(productId, sliding);
          },
        },
      ],
    });
    await alert.present();
    await alert.onDidDismiss();
  }

  presentToast() {
    this.toastController
      .create({
        message: 'The product was successfully deleted!',
        duration: 3000,
        position: 'top',
        icon: 'cloud-done',
        color: 'success',
      })
      .then((el) => {
        el.onDidDismiss();
        el.present();
      });
  }

  ngOnDestroy(): void {
    if (this.productsSub) {
      this.productsSub.unsubscribe();
    }
  }
}
