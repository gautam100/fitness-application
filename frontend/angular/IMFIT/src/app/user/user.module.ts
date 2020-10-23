import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ProfileComponent } from './profile/profile.component';
import { LeftMenuComponent } from './../left-menu/left-menu.component';
import { OrdersComponent } from './orders/orders.component';
import { ManagePasswordComponent } from './manage-password/manage-password.component';
import { BrandsComponent } from './brands/brands.component';
import { SupportComponent } from './support/support.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ],
  exports: [
    LeftMenuComponent,
    OrdersComponent,
    ProfileComponent,
    ManagePasswordComponent,
    BrandsComponent,
    SupportComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [UserComponent, ProfileComponent, LeftMenuComponent, OrdersComponent, ManagePasswordComponent, BrandsComponent, SupportComponent],
  providers: [],
})
export class UserModule { }
