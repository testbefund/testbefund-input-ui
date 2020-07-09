import {TestbefundTestContainer} from '../generated/testbefund-api';

export interface TestbefundStore {
  writeId: string;
  currentContainer: TestbefundTestContainer;
}

export const testbefundDefaultStore: TestbefundStore = {
  writeId: '',
  currentContainer: null
};
