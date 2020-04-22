import {createAction, props} from '@ngrx/store';
import {TestCase, TestContainerWriteT} from '../generated/testbefund-api';

export const TestbefundActions = {
  setWriteId: createAction('[Testbefund] Set write id', props<{writeId: string}>()),
  loadCurrentContainer: createAction('[Testbefund] load current container'),
  setCurrentContainer: createAction('[Testbefund] Set current container', props<{currentContainer: TestContainerWriteT}>()),
  updateTest: createAction('[Testbefund] Update test', props<{testCase: TestCase, status: TestCase.CurrentStatusEnum}>())
};
