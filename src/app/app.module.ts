import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BillingComponent } from './billing/billing.component';
import { BillingCartComponent } from './billing-cart/billing-cart.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { SortPipe } from './shared/sort.pipe';
import { FilterPipe } from './shared/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { UserMetadataComponent } from './user-metadata/user-metadata.component';

@NgModule({
  declarations: [
    AppComponent,
    BillingComponent,
    BillingCartComponent,
    CartComponent,
    CheckoutComponent,
    HeaderComponent,
    ProductsComponent,
    SortPipe,
    FilterPipe,
    LoginComponent,
    LogoutComponent,
    UserMetadataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    AuthModule.forRoot({
      domain: 'dev-h2pj9e-7.us.auth0.com',
      clientId: 'WsIrb8arQ7gYUdT2qJQejTtza1DUUygG',
      audience: 'https://dev-h2pj9e-7.us.auth0.com/api/v2/',
      scope: 'read:current_user',
      httpInterceptor: {
        allowedList: [
          {
            uri: 'https://dev-h2pj9e-7.us.auth0.com/api/v2/*',
            tokenOptions: {
              audience: 'https://dev-h2pj9e-7.us.auth0.com/api/v2/',
              scope: 'read:current_user'
            }
          }
        ]
      }
    })
  ],
  providers: [
    FilterPipe,
    SortPipe,

    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
