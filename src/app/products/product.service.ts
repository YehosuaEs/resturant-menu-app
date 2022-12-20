import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, switchMap, take, tap } from 'rxjs';
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
    return this._products.asObservable();
  }

  constructor(private http: HttpClient) {}

  fetchPeoducts() {
    return this.http
      .get<{
        [key: string]: Product;
      }>(`${this.DATABASE_API_URL}.json`)
      .pipe(
        map((resData) => {
          const products = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              products.push(
                new Product(
                  key,
                  resData[key].name,
                  resData[key].category,
                  resData[key].subcategory,
                  resData[key].description,
                  resData[key].img,
                  resData[key].price
                )
              );
            }
          }
          return products;
        }),
        tap((products) => {
          this._products.next(products);
        })
      );
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.DATABASE_API_URL}/${id}.json`).pipe(
      map((productData) => {
        return new Product(
          id,
          productData.name,
          productData.category,
          productData.subcategory,
          productData.description,
          productData.img,
          productData.price
        );
      })
    );
  }

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

  updateProduct(
    productId: string,
    name: string,
    category: string,
    subcategory: string,
    description: string,
    img: string,
    price: number
  ) {
    let updateProduct: Product[];
    return this.products.pipe(
      take(1),
      switchMap((products) => {
        if (!products || products.length <= 0) {
          return this.fetchPeoducts();
        } else {
          return of(products);
        }
      }),
      switchMap((products) => {
        const updateProductIndex = products.findIndex(
          (p) => p.id === productId
        );
        updateProduct = [...products];
        const oldProduct = updateProduct[updateProductIndex];
        updateProduct[updateProductIndex] = new Product(
          oldProduct.id,
          name,
          category,
          subcategory,
          description,
          img,
          price
        );
        return this.http.put(`${this.DATABASE_API_URL}/${productId}.json`, {
          ...updateProduct[updateProductIndex],
          id: null,
        });
      }),
      tap(() => {
        this._products.next(updateProduct);
      })
    );
  }
}
