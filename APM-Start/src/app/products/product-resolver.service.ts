import { ProductService } from './product.service';
import { Product } from './product';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class ProductResolveGuard implements Resolve<Product> {

  constructor(
    private readonly productService: ProductService
  ) { }

  resolve(
    activatedRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const id: number = Number(activatedRoute.paramMap.get('id'));
    return this.productService.getProduct(id);
  }
}
