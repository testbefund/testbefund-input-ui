import {TestContainerWriteT} from '../generated/testbefund-api';

export interface TestbefundStore {
  writeId: string;
  currentContainer: TestContainerWriteT;
}

export const testbefundDefaultStore: TestbefundStore = {
  writeId: '',
  currentContainer: null
};
