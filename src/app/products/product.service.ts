import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly DATABASE_API_URL: string =
    'https://restaurant-ionic-fb1eb-default-rtdb.europe-west1.firebasedatabase.app/menu-products';

  private _products = new BehaviorSubject<Product[]>([]);

  get products() {
    // return [...this._places];
    return this._products.asObservable();
  }

  constructor(private http: HttpClient) {}

  addProduct(
    name: string,
    category: string,
    subcategory: string,
    description: string,
    img: string,
    price: number
  ) {
    let generatedId: string;
    const newProduct = new Product(
      Math.random().toString(),
      name,
      category,
      subcategory,
      description,
      img,
      price
    );
    return this.http
      .post<{ name: string }>(`${this.DATABASE_API_URL}.json`, {
        ...newProduct,
        id: null,
      })
      .pipe(
        switchMap((resData) => {
          generatedId = resData.name;
          return this.products;
        }),
        take(1),
        tap((places) => {
          newProduct.id = generatedId;
          this._products.next(places.concat(newProduct));
        })
      );
  }
}
