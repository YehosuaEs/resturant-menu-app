import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Subcategory } from '../product.model';

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
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(4)],
      }),
      category: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      subcategory: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      description: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(10)],
      }),
      img: new FormControl('', {
        updateOn: 'blur',
        validators: [
          Validators.required,
          // Validators.pattern(
          //   /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
          // ),
        ],
      }),
      price: new FormControl('', {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(0)],
      }),
    });
  }

  onCreateProduct() {}

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
