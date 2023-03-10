import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsPage } from './products.page';

const routes: Routes = [
  {
    path: '',
    component: ProductsPage,
  },
  {
    path: 'create',
    loadChildren: () =>
      import('./new-product/new-product.module').then(
        (m) => m.NewProductPageModule
      ),
  },
  {
    path: 'edit/:productId',
    loadChildren: () =>
      import('./edit-product/edit-product.module').then(
        (m) => m.EditProductPageModule
      ),
  },
  {
    path: 'detail/:productId',
    loadChildren: () =>
      import('./detail-product/detail-product.module').then(
        (m) => m.DetailProductPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsPageRoutingModule {}
