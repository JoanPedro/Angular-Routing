import { ProductRoutingModule } from './product-routing.module';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductResolveGuard } from './product-resolver.service';
import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ProductRoutingModule
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent
  ], providers: [
    ProductResolveGuard
  ]
})
export class ProductModule { }
