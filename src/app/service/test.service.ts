import {Injectable} from '@angular/core';
import {TestCase, TestContainerWriteT, TestControllerV1Service} from '../generated/testbefund-api';
import {EMPTY, Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {TestbefundActions} from '../store/testbefund.actions';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private testController: TestControllerV1Service, private messageService: MessageService) {
  }


  getContainerByWriteId(writeId: string): Observable<TestContainerWriteT> {
    return this.testController.getTestContainerByWriteIdUsingGET(writeId).pipe(
      catchError(_ => EMPTY)
    );
  }

  updateTest(writeId: string, testCase: TestCase, result: TestCase.CurrentStatusEnum): Observable<Action> {
    let apiResult: 'UNKNOWN' | 'POSITIVE' | 'NEGATIVE';
    if (result === 'CONFIRM_NEGATIVE') {
      apiResult = 'NEGATIVE';
    } else if (result === 'CONFIRM_POSITIVE') {
      apiResult = 'POSITIVE';
    } else {
      apiResult = 'UNKNOWN';
    }
    return this.testController.updateTestByWriteIdUsingPOST(testCase.id, apiResult, writeId).pipe(
      tap(_ => this.messageService.add({severity: 'success', summary: 'Gespeichert', detail:  `Testbefund für ${testCase.title} gespeichert`})),
      catchError((err) => {
        console.error(err);
        this.messageService.add({severity: 'error', summary: 'Speichern Fehlgeschlagen', detail: `Testbefund für ${testCase.title} konnte nicht gespeichert werden`});
        return of(TestbefundActions.loadCurrentContainer());
      }),
      switchMap(() => EMPTY)
    );
  }
}
