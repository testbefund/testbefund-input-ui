import {Action, createReducer, on} from '@ngrx/store';
import {testbefundDefaultStore, TestbefundStore} from './testbefund.store';
import {TestbefundActions} from './testbefund.actions';
import {TestContainerWriteT} from '../generated/testbefund-api';

function handleSetCurrentContainer(state: TestbefundStore, currentContainer: TestContainerWriteT): TestbefundStore {
  console.log(currentContainer);
  const testCases = [...currentContainer.testCases].sort((a, b) => a.title.localeCompare(b.title));
  return {...state, currentContainer: {...currentContainer, testCases}};
}

const reducer = createReducer(testbefundDefaultStore,
  on(TestbefundActions.setWriteId, (state, {writeId}) => ({...state, writeId})),
  on(TestbefundActions.setCurrentContainer, (state, {currentContainer}) => handleSetCurrentContainer(state, currentContainer)),
  on(TestbefundActions.loadCurrentContainer, state => ({...state, currentContainer: null}))
);

export function testbefundReducer(state: TestbefundStore, action: Action): TestbefundStore {
  return reducer(state, action);
}
