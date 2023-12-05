import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import {map, switchMap} from "rxjs";

import * as RecipesActions from './recipe.actions';
import {Recipe} from "../recipe.model";

@Injectable()
export class RecipeEffects {
  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.FETCH_RECIPES),
      switchMap(() => {
        return this.http
          .get<Recipe[]>(
            'https://ng-recipe-book-a9c4d-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
          );
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      map(recipes => {
        return new RecipesActions.SetRecipes(recipes);
      })
    )
  );


  constructor(private actions$: Actions, private http: HttpClient) {}
}
