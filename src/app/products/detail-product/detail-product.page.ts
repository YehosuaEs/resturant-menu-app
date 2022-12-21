import {
  AlertController,
  LoadingController,
  NavController,
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
  private productsSub: Subscription;
  handlerMessage = '';

  constructor(
    private productService: ProductService,
    private loadingController: LoadingController,
    private navController: NavController,
    private alertController: AlertController,
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
        this.productsSub = this.productService
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

  onGoBack() {
    this.router.navigate(['/products']);
  }
}
