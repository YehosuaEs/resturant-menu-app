import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { catchError, throwError } from 'rxjs';
import { Product, Subcategory } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  product!: Product;
  form!: FormGroup;
  subcategory: Subcategory[];
  handlerMessage = '';
  productId: string;

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private navController: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {
    this.subcategory = [
      { value: 'Botanitas' },
      { value: 'Burritos' },
      { value: 'Tacos de plancha' },
      { value: 'Tacos de guiso' },
      { value: 'Tacos especiales' },
      { value: 'Quesadillotas y Tacos XL' },
      { value: 'Postres caseros' },
      { value: 'Aguas frescas' },
      { value: 'Cerveza' },
      { value: 'Otros' },
    ];
    this.productId = '';
  }

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      if (!param.has('productId')) {
        this.navController.navigateBack('/products');
        return;
      }
      this.productId = param.get('productId');
      console.log(param.get('productId'));
    });

    this.form = new FormGroup({
      name: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(4)],
      }),
      category: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      subcategory: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required],
      }),
      description: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.minLength(10)],
      }),
      img: new FormControl('', {
        updateOn: 'change',
        validators: [
          Validators.required,
          // Validators.pattern(
          //   /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
          // ),
        ],
      }),
      price: new FormControl('', {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(0)],
      }),
    });
  }

  onEditProduct() {
    if (!this.form.valid) {
      return;
    }
    this.loadingController
      .create({
        spinner: 'bubbles',
        message: 'Updating the product... please wait!',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.productService
          .updateProduct(
            this.productId,
            this.form.value.name,
            this.form.value.category,
            this.form.value.subcategory,
            this.form.value.description,
            this.form.value.img,
            +this.form.value.price
          )
          .pipe(
            catchError((err) => {
              this.alertController
                .create({
                  header: 'An error occurred',
                  message:
                    'The product could not be added, please try again later',
                  buttons: [
                    {
                      text: 'OK',
                      handler: () => {
                        this.form.reset();
                        this.router.navigate(['/products']);
                      },
                    },
                  ],
                })
                .then((alertEl) => {
                  loadingEl.dismiss();
                  alertEl.present();
                  alertEl.onDidDismiss();
                });
              return throwError(err);
            })
          )
          .subscribe(() => {
            this.form.reset();
            loadingEl.dismiss();
            this.router.navigate(['/products']);
          });
      });
  }

  async onConfirmEditProduct() {
    const alert = await this.alertController.create({
      header: 'Please confirm!',
      message: 'Are you sure you want to update this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.onEditProduct();
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });
    await alert.present();
    await alert.onDidDismiss();
  }
  async onGoBack() {
    const alert = await this.alertController.create({
      header: 'Please confirm!',
      message: 'Are you sure you want to leave?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
            this.router.navigate(['/products']);
            // this.form.reset();
          },
        },
      ],
    });
    await alert.present();
    await alert.onDidDismiss();
  }
}
