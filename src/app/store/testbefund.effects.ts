import {Injectable} from '@angular/core';
import {EMPTY} from 'rxjs';
import {Store} from '@ngrx/store';
import {TestService} from '../service/test.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {TestbefundActions} from './testbefund.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {AppState} from '../app.state';
import {TestbefundSelectors} from './testbefund.selectors';

@Injectable()
export class TestbefundEffects {

  loadWriteContainer$ = createEffect(() => this.actions$.pipe(
    ofType(TestbefundActions.loadCurrentContainer),
    withLatestFrom(this.store.select(TestbefundSelectors.selectWriteId)),
    switchMap(([_, writeId]) => this.testService.getContainerByWriteId(writeId)),
    map(currentContainer => TestbefundActions.setCurrentContainer({currentContainer}))
  ));

  updateTest$  = createEffect(() => this.actions$.pipe(
    ofType(TestbefundActions.updateTest),
    withLatestFrom(this.store.select(TestbefundSelectors.selectWriteId)),
    switchMap(([action, writeId]) => this.testService.updateTest(writeId, action.testCase, action.status)),
  ));

  constructor(private actions$: Actions, private store: Store<AppState>, private testService: TestService) {
  }
}
