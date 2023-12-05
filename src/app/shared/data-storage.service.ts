import {Injectable} from '@angular/core';
import {HttpClient, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {map, tap} from "rxjs";
import {Store} from "@ngrx/store";

import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from "../recipes/store/recipe.actions";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService implements HttpInterceptor {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private store: Store<fromApp.AppState>
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req);
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put(
        'https://ng-recipe-book-a9c4d-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(
      'https://ng-recipe-book-a9c4d-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
    )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          // this.recipeService.setRecipes(recipes);
          this.store.dispatch(new RecipesActions.SetRecipes(recipes));
        })
      );
  }
}
