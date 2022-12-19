import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly DATABASE_API_URL: string =
    'https://restaurant-ionic-fb1eb-default-rtdb.europe-west1.firebasedatabase.app/menu-products';

  private _products = new BehaviorSubject<Product[]>([]);

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
    const newPlace = new Product(
      Math.random().toString(),
      name,
      category,
      subcategory,
      description,
      img,
      price
    );
  }
}
