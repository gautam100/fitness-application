import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ThemeModule } from '../@theme/theme.module';
import { NbLayoutModule, NbCardModule, NbCheckboxModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    NbCheckboxModule,
    // ThemeModule,
    FormsModule,
    AuthRoutingModule
  ],
  declarations: [AuthComponent,LoginComponent, LogoutComponent]
})
export class AuthModule { }
