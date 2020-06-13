import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { DetailComponent } from './detail/detail.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


import { CategoriesComponent } from './categories/categories.component';
import { LogoutComponent } from './logout/logout.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { PaymentConfirmationPageComponent } from './payment-confirmation-page/payment-confirmation-page.component'
import { PaymentFailurePageComponent } from './payment-failure-page/payment-failure-page.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'detail/:id',
    component: DetailComponent
  },
  {
    path: 'cate/:id',
    component: CategoriesComponent
  },
  {
    //path: 'paymentpage/:id/:amount',
    path: 'paymentpage',
    component: PaymentPageComponent
  },
  {
    path: 'payment/payment-confirmation-page/:order_id',
    component: PaymentConfirmationPageComponent
  },
  {
    path: 'payment/payment-failure-page/:order_id',
    component: PaymentFailurePageComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'forgot',
    component: ForgotComponent
  },
  {
    path: 'reset/:id',
    component: ResetPasswordComponent
  }, {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
