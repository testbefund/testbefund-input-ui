import {AppState} from '../app.state';
import {createSelector} from '@ngrx/store';

const selectFeature = (state: AppState) => state.testbefund;

export const TestbefundSelectors = {
  selectWriteId: createSelector(selectFeature, s1 => s1.writeId),
  selectCurrentContainer: createSelector(selectFeature, s1 => s1.currentContainer),
};
