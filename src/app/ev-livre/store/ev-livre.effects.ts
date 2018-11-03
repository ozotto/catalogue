import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

//import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

/*import * as FoodActions from "./actions";
import { NutritionService } from ".././services/nutrition.service";*/

import * as LivreActions from '../actions/schedule.actions';
import {PublicService} from '../services/public.service';

@Injectable()

export class LivreEffects {
	
	/*@Effect() 
	LoadMatieres$: Observable<LivreActions.Actions> = this.actions$
    .pipe(
      ofType(LivreActions.GET_PUBLIC),
      switchMap(action  =>  this.publicservice.getPublics()),
      map(publics => new LivreActions.SuccessInitPublic(publics)),
      catchError((err) => of(new LivreActions.ErrorLoadAction(err)))
    );
   */
    
  @Effect() LoadPublics$: Observable<LivreActions.Actions> = this.actions$
    .pipe(
      ofType(LivreActions.GET_PUBLIC),
      /*switchMap(action  =>  this.publicservice.getPublics()),
      map(publics => new LivreActions.SuccessInitPublic(publics)),
      catchError((err) => of(new LivreActions.ErrorLoadAction(err)))*/
    );

  /*@Effect()
  login$ = this.actions$.pipe(
    ofType(LivreActions.GET_PUBLIC),
    map((action: Login) => action.payload),
    // Use `exhaustMap` to wait for Observable respond
    exhaustMap((auth: Authentication) =>
      this.authService
        .login(auth)
        .pipe(
          map(username => new LoginSuccess(username)),
          catchError(error => of(new LoginFailed(error)))
        )
    )
  );*/
  
  constructor( 	
  	private actions$: Actions, 
    private publicservice: PublicService
 	) {}
 	
}