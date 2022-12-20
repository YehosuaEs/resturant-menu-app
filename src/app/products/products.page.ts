import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductService } from './product.service';
import { Product } from './product.model';
import { IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit, OnDestroy {
  products: Product[];
  isLoading: boolean;
  private placesSub!: Subscription;

  constructor(private productService: ProductService, private router: Router) {
    this.products = [];
    this.isLoading = false;
  }

  ngOnInit() {
    this.placesSub = this.productService.products.subscribe((products) => {
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
    console.log('delete' + productId);
  }

  ngOnDestroy(): void {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
