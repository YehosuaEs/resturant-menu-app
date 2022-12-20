import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductService } from './product.service';
import { Product } from './product.model';
import {
  IonItemSliding,
  LoadingController,
  NavController,
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
    private router: Router,
    private toastController: ToastController
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
    console.log('Edit');
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

  presentToast() {
    this.toastController
      .create({
        message: 'Product was deleted successfully',
        duration: 3000,
        position: 'top',
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
