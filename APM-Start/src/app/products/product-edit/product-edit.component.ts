import { ProductResolved } from './../product';
import { ActivatedRoute, ParamMap, Params, Router, Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { MessageService } from '../../messages/message.service';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  pageTitle = 'Product Edit';
  errorMessage: string;

  private dataIsValid: { [key: string]: boolean }
  private currentProduct: Product;
  private originalProduct: Product;
  private resolvedData$: Subscription;

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  get isDirty(): boolean {
    return JSON.stringify(this.originalProduct) !== JSON.stringify(this.currentProduct);
  }

  get product(): Product {
    return this.currentProduct;
  }

  set product(value: Product) {
    this.currentProduct = value;

    this.originalProduct = Object.assign({}, this.currentProduct);
  }

  ngOnInit(): void {
    this.resolvedData$ = this.activatedRoute.data.subscribe({
      next: (data: Data) => {
        const resolvedData: ProductResolved = data['resolvedData'];
        this.errorMessage = resolvedData.error;
        this.onProductRetrieved(resolvedData.product);
      }
    })
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path)
      return this.dataIsValid[path];
    return (
      this.dataIsValid &&
      Object.keys(this.dataIsValid).every(tab => this.dataIsValid[tab] === true)
    );
  }

  getProduct(id: number): void {
    this.productService.getProduct(id).subscribe({
      next: this.onProductRetrieved,
      error: err => this.errorMessage = err
    });
  }

  onProductRetrieved: (product: Product) => void = product => {
    this.product = product;

    if (!this.product) {
      this.pageTitle = 'No product found';
    } else {
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () => this.onSaveComplete(`${this.product.productName} was deleted`),
          error: err => this.errorMessage = err
        });
      }
    }
  }

  saveProduct(): void {
    if (true === true) {
      if (this.product.id === 0) {
        this.productService.createProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The new ${this.product.productName} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        this.productService.updateProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.product.productName} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }

    // Navigate back to the product list
    this.router.navigate(['/products'])
  }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};

    // 'info' tab
    if (this.product.productName
      && this.product.productName.length >= 3
      && this.product.productCode) {
      this.dataIsValid['info'] = true;
    } else {
      this.dataIsValid['info'] = false;
    }

    // 'tags' tab
    if (this.product.category
      && this.product.category.length >= 3) {
      this.dataIsValid['tags'] = true;
    } else {
      this.dataIsValid['tags'] = false;
    }
  }
}
