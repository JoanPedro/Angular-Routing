import { Product } from './../product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './product-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit {
  @ViewChild(NgForm, { static: true }) productForm: NgForm;

  errorMessage: string;
  product: Product;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.parent.data.subscribe(
      (data: Data) => {
        if(this.productForm)
          this.productForm.reset();
        this.product = data['resolvedData'].product;
      }
    )
  }
}
