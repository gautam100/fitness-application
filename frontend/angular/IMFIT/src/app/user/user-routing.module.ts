import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { ManagePasswordComponent } from './manage-password/manage-password.component';
import { BrandsComponent } from './brands/brands.component';
import { SupportComponent } from './support/support.component';

const routes: Routes = [{
  path: '',
  component: UserComponent,
  canActivateChild: [],
  children: [
    {
      path: 'profile',
      component: ProfileComponent,
    },
    {
      path: 'orders',
      component: OrdersComponent,
    },
    {
      path: 'manage-password',
      component: ManagePasswordComponent,
    },
    {
      path: 'brands',
      component: BrandsComponent,
    },
    {
      path: 'support',
      component: SupportComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
