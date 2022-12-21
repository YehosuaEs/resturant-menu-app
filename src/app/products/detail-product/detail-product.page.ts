import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductService } from './../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {
  product: Product;
  isLoading: boolean;
  productId: string;
  private productSub: Subscription;
  handlerMessage = '';

  constructor(
    private productService: ProductService,
    private loadingController: LoadingController,
    private navController: NavController,
    private alertController: AlertController,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.route.paramMap.subscribe((param) => {
        if (!param.has('productId')) {
          this.navController.navigateBack('/products');
          return;
        }
        this.productId = param.get('productId');
        this.productSub = this.productService
          .getProduct(this.productId)
          .subscribe(
            (product) => {
              this.product = product;
              this.isLoading = false;
            },
            (error) => {
              this.alertController
                .create({
                  header: 'An error occurred!',
                  message: 'Could not Load the product, please try again later',
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        this.router.navigate(['/products']);
                      },
                    },
                  ],
                })
                .then((alertEl) => {
                  alertEl.present();
                });
            }
          );
      });
    }, 600);
  }

  optionDelete() {
    this.loadingController
      .create({
        spinner: 'bubbles',
        message: ' Please wait! We are deleting this product',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.productService.deleteProduct(this.productId).subscribe(() => {
          loadingEl.dismiss();
          this.router.navigate(['/', 'products']);
        });
        setTimeout(() => {
          this.presentToast();
        }, 700);
      });
  }

  handleChange(e): string {
    if (e.detail.value === 'edit') {
      this.router.navigate(['/', 'products', 'edit', this.product.id]);
    } else {
      this.onConfirmDeleteProduct();
    }
    return e.detail.value;
  }

  async onConfirmDeleteProduct() {
    const alert = await this.alertController.create({
      header: 'Please confirm!',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.optionDelete();
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
        duration: 2500,
        position: 'top',
        icon: 'cloud-done',
        color: 'success',
      })
      .then((el) => {
        el.onDidDismiss();
        el.present();
      });
  }

  onGoBack() {
    this.router.navigate(['/products']);
  }

  ngOnDestroy() {
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
  }
}
