import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Product, ProductResolved } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;

  constructor(private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const resolvedData: ProductResolved = this.activatedRoute.snapshot.data['resolvedData'];
    this.errorMessage = resolvedData.error;
    this.onProductRetrieved(resolvedData.product);
  }

  onProductRetrieved(product: Product): void {
    this.product = product;
    console.log(this.product)
    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}
