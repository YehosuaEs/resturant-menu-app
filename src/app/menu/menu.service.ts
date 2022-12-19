import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  readonly DATABASE_API_URL: string =
    'https://restaurant-ionic-fb1eb-default-rtdb.europe-west1.firebasedatabase.app/menu-products';
  constructor() {}
}
