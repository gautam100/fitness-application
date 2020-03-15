import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IndexComponent } from './index/index.component';
import { HeaderMainComponent } from './header-main/header-main.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { UserService } from './@core/data/users.service';

import { CoreModule } from './@core/core.module';
import { FormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'ng4-social-login';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('602254965216-cr900q3maj5vpln5j6sc8rvorf30eke5.apps.googleusercontent.com'),
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('228510521499174'),
  }
], false);

export function provideConfig(){
  return config;
}


// import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { DetailComponent } from './detail/detail.component';
import { CategoriesComponent } from './categories/categories.component';
import { LogoutComponent } from './logout/logout.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { PaymentConfirmationPageComponent } from './payment-confirmation-page/payment-confirmation-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderMainComponent,
    LeftMenuComponent,
    FooterComponent,
    IndexComponent,
    DetailComponent,
    CategoriesComponent,
    LogoutComponent,
    PaymentPageComponent,
    PaymentConfirmationPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // AuthModule,
    CoreModule.forRoot(),
    SocialLoginModule
  ],
  exports: [
    HeaderComponent,
    HeaderMainComponent,
    LeftMenuComponent,
    FooterComponent,
    IndexComponent,
    DetailComponent,
    CategoriesComponent,
    LogoutComponent,
    PaymentPageComponent,
    PaymentConfirmationPageComponent
  ],
  providers: [DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: [APP_BASE_HREF],
      useValue: '/',
    },
    UserService,
    {
      provide: AuthServiceConfig, useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
