import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'menu',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../menu/menu.module').then((m) => m.MenuPageModule),
          },
          {
            path: 'product/:productId',
            loadChildren: () =>
              import(
                '../menu/products/detail-product/detail-product.module'
              ).then((m) => m.DetailProductPageModule),
          },
          {
            path: 'editProduct/:productId',
            loadChildren: () =>
              import('../menu/products/edit-product/edit-product.module').then(
                (m) => m.EditProductPageModule
              ),
          },
          {
            path: 'newProduct',
            loadChildren: () =>
              import('../menu/products/new-product/new-product.module').then(
                (m) => m.NewProductPageModule
              ),
          },
        ],
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('../contact/contact.module').then((m) => m.ContactPageModule),
      },
      {
        path: 'home',
        redirectTo: '/restaurant',
        pathMatch: 'full',
      },
      // {
      //   path: '',
      //   loadChildren: () =>
      //     import('../home/home.module').then((m) => m.HomePageModule),
      // },
    ],
  },
  {
    path: '',
    redirectTo: '/restaurant',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
