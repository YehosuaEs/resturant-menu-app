import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { Subcategory } from '../product.model';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {
  form!: FormGroup;
  subcategory: Subcategory[];
  handlerMessage = '';
  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private productService: ProductService,
    private toastController: ToastController,
    private router: Router
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
  }

  ngOnInit() {
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

  onCreateProduct() {
    if (!this.form.valid) {
      return;
    }

    this.loadingController
      .create({
        spinner: 'bubbles',
        message: 'Creating new product... please wait!',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.productService
          .addProduct(
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

  async onConfirmAddProduct() {
    const alert = await this.alertController.create({
      header: 'Please confirm!',
      message: 'Are you sure you want to add this product?',
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
            this.onCreateProduct();
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
        message: 'The product was successfully added!',
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
            this.form.reset();
          },
        },
      ],
    });
    await alert.present();
    await alert.onDidDismiss();
  }
}
