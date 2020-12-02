import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service'
import { BarRatingModule } from "ngx-bar-rating";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';

import { MatSnackBarModule } from '@angular/material/snack-bar'

import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { ProductsComponent } from './components/products/products.component'
import { AccountComponent } from './components/account/account.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CompareComponent } from './components/compare/compare.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContentComponent } from './components/content/content.component';
import { CartComponent } from './components/cart/cart.component';
import { ErrorComponent } from './components/error/error.component';
import { BsHeaderComponent } from './components/bs-header/bs-header.component';
import { BsFooterComponent } from './components/bs-footer/bs-footer.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogColumnComponent } from './components/blog-column/blog-column.component';
import { BlogSideComponent } from './components/blog-side/blog-side.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { DefaultComponent } from './components/default/default.component';
import { ProductComponent } from './components/product/product.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PersonalDetaillsComponent } from './components/personal-detaills/personal-detaills.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddressesComponent } from './components/addresses/addresses.component';
import { PaymentOptionsComponent } from './components/payment-options/payment-options.component';

import { AddressTemplateComponent } from './components/address-template/address-template.component';
import { CardTemplateComponent } from './components/card-template/card-template.component';
import { Checkout2Component } from './components/checkout2/checkout2.component';
import { Checkout3Component } from './components/checkout3/checkout3.component';
import { ShopComponent } from './components/shop/shop.component';
import { CartHoverComponent } from './components/cart-hover/cart-hover.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { HomeMenuComponent } from './components/home-menu/home-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader }  from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CheckoutMainComponent } from './components/checkout-main/checkout-main.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { WishlistUserComponent } from './components/wishlist-user/wishlist-user.component';
import { BlogSearchComponent } from './components/blog-search/blog-search.component';
import { ProductTemplateComponent } from './components/product-template/product-template.component';
import { CategoricalComponent } from './components/categorical/categorical.component';
import { DiscountedCategoricalComponent } from './components/discounted-categorical/discounted-categorical.component';
export const createTransalteLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
};

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    AccountComponent,
    WishlistComponent,
    CompareComponent,
    CheckoutComponent,
    ContactComponent,
    ContentComponent,
    CartComponent,
    ErrorComponent,
    BsHeaderComponent,
    BsFooterComponent,
    ProductsComponent,
    HeaderMenuComponent,
    AboutUsComponent,
    BlogListComponent,
    BlogColumnComponent,
    BlogSideComponent,
    BlogsComponent,
    DefaultComponent,
    ProductComponent,
    PaymentComponent,
    PersonalDetaillsComponent,
    OrdersComponent,
    AddressesComponent,
    PaymentOptionsComponent,
    AddressTemplateComponent,
    CardTemplateComponent,
    Checkout2Component,
    Checkout3Component,
    ShopComponent,
    CartHoverComponent,
    SearchResultComponent,
    HomeMenuComponent,
    CheckoutMainComponent,
    OrderHistoryComponent,
    WishlistUserComponent,
    BlogSearchComponent,
    ProductTemplateComponent,
    CategoricalComponent,
    DiscountedCategoricalComponent
  ],
  imports: [
    BrowserModule,
    BarRatingModule,
    AppRoutingModule,
    MatSliderModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTransalteLoader,
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot([
      {path:'', component: DefaultComponent},
      {path:'products',component: ProductsComponent},
      {path:'product/:id', component:ProductComponent},
      {path:'shop', component:ShopComponent},
      {path:'shopping-cart',component: CartComponent},
      {path:'wishlist', component:WishlistComponent},
      {path:'compare', component:CompareComponent},
      {path:'contact', component:ContactComponent},
      {path:'about_us', component:AboutUsComponent},
      {path:'cart', component:CartComponent},
      {path:'category/:cat', component:CategoricalComponent},
      {path:'search', component:SearchResultComponent},

      {
        path:'check-out',
        component: CheckoutMainComponent,
        children: [
          {path:'',component: CheckoutComponent},
          {path:'2',component: Checkout2Component},
          {path:'3',component: Checkout3Component},
        ]
      },

      {
        path:'account',
        component:AccountComponent,
        children: [
          {path: '', component:PersonalDetaillsComponent},
          {path: 'orders', component: OrdersComponent},
          {path:'addresses', component:AddressesComponent},
          {path: 'wishlist-user', component: WishlistUserComponent},
          {path:'my_payments', component:PaymentOptionsComponent}
        ]
      },
      {
        path: 'blogs',
        component: BlogsComponent,
        children: [
          {path: '', component:BlogListComponent},
          {path: 'search', component:BlogSearchComponent},
          {path: ':blogid', component:BlogColumnComponent},
        ]
      },
      {path:'**', component:ErrorComponent},
    ])
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
