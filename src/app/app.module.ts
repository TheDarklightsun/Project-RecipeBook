import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {RecipesModule} from "./recipes/recipes.module";
import {ShoppingListModule} from "./shopping-list/shopping-list.module";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core.module";
import {AuthModule} from "./auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    NgOptimizedImage,
    AppRoutingModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule,
    SharedModule,
    CoreModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
