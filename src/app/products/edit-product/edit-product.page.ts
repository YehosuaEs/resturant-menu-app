import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  NavController,
  ToastController,
} from '@ionic/angular';
import { catchError, Subscription, throwError } from 'rxjs';
import { Product, Subcategory } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  product!: Product;
  form: FormGroup;
  isLoading: boolean;
  subcategory: Subcategory[];
  handlerMessage = '';
  productId: string;
  private productSub: Subscription;

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private navController: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private toastController: ToastController
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
    this.isLoading = false;
  }

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.route.paramMap.subscribe((param) => {
        if (!param.has('productId')) {
          this.navController.navigateBack('/products');
          return;
        }
        this.productId = param.get('productId');
        this.productSub = this.productService
          .getProduct(this.productId)
          .subscribe(
            (product) => {
              this.product = product;
              this.form = new FormGroup({
                name: new FormControl(this.product.name, {
                  updateOn: 'blur',
                  validators: [Validators.required, Validators.minLength(4)],
                }),
                category: new FormControl(this.product.category, {
                  updateOn: 'blur',
                  validators: [Validators.required],
                }),
                subcategory: new FormControl(this.product.subcategory, {
                  updateOn: 'blur',
                  validators: [Validators.required],
                }),
                description: new FormControl(this.product.description, {
                  updateOn: 'blur',
                  validators: [Validators.required, Validators.minLength(10)],
                }),
                img: new FormControl(this.product.img, {
                  updateOn: 'blur',
                  validators: [
                    Validators.required,
                    // Validators.pattern(
                    //   /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
                    // ),
                  ],
                }),
                price: new FormControl(this.product.price, {
                  updateOn: 'blur',
                  validators: [Validators.required, Validators.min(0)],
                }),
              });
              this.isLoading = false;
            },
            (error) => {
              this.alertController
                .create({
                  header: 'An error occurred',
                  message: 'Product could not be fetch, please try again later',
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
                  alertEl.dismiss();
                });
            }
          );
      });
    }, 500);
  }

  onEditProduct() {
    if (!this.form.valid) {
      return;
    }
    this.loadingController
      .create({
        spinner: 'bubbles',
        message: 'Updating the product... please wait!',
        cssClass: 'custom-loading',
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
            this.presentToast();
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

  presentToast() {
    this.toastController
      .create({
        message: 'Product was update successfully!',
        duration: 3000,
        position: 'top',
        icon: 'cloud-done',
        color: 'success',
      })
      .then((el) => {
        el.onDidDismiss();
        el.present();
      });
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

  ngOnDestroy() {
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
  }
}
