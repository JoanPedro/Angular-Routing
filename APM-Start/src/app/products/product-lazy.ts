import { LoadChildrenCallback } from '@angular/router';

export const lazyLoadProducts: LoadChildrenCallback = async () => {
  const productModule = await import('./product.module');
  return productModule.ProductModule;
}
