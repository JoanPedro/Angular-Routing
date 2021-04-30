import { SelectivePreloadModuleListStrategy } from './selective-strategy.service';
import { AuthGuard } from './user/auth.guard';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { lazyLoadProducts } from './products/product-lazy';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'products', data: { preload: true }, loadChildren: lazyLoadProducts, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy: SelectivePreloadModuleListStrategy
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
