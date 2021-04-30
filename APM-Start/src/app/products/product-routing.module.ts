import { AuthGuard } from './../user/auth.guard';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductResolveGuard } from './product-resolver.service';
import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'products', canActivate: [AuthGuard], children: [
      { path: '', component: ProductListComponent },
      { path: ':id', component: ProductDetailComponent, resolve: { resolvedData: ProductResolveGuard } },
      {
        path: ':id/edit', component: ProductEditComponent, resolve: { resolvedData: ProductResolveGuard },
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: ProductEditInfoComponent },
          { path: 'tags', component: ProductEditTagsComponent }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
