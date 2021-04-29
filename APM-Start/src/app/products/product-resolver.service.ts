import { catchError, map } from 'rxjs/operators';
import { ProductService } from './product.service';
import { ProductResolved } from './product';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class ProductResolveGuard implements Resolve<ProductResolved> {

  constructor(
    private readonly productService: ProductService
  ) { }

  resolve(
    activatedRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const id: string = activatedRoute.paramMap.get('id');
    if (isNaN(+id)) {
      const errorMessage = `Product id was not a number: ${id}`;
      console.log(errorMessage);
      return of({ product: null, error: errorMessage })
    }

    return this.productService.getProduct(Number(id))
      .pipe(
        map(product => product),
        catchError(error => {
          const errorMessage = `Retrieval error: ${error}`;
          console.log(errorMessage);
          return of({ product: null, error: errorMessage })
        })
      );
  }
}
