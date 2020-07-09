import {Injectable} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {TestbefundActions} from '../store/testbefund.actions';
import {
  TestbefundFindingResult,
  TestbefundTest,
  TestbefundTestContainer,
  TestService
} from '../generated/testbefund-api';

@Injectable({
  providedIn: 'root'
})
export class TestbefundApiService {

  constructor(private testService: TestService, private messageService: MessageService) {
  }


  getContainerByWriteId(writeId: string): Observable<TestbefundTestContainer> {
    return this.testService.getTestContainer(writeId).pipe(
      catchError(_ => EMPTY)
    );
  }

  updateTest(writeId: string, testCase: TestbefundTest, result: TestbefundFindingResult): Observable<Action> {
    return this.testService.updateTest(writeId, testCase.id, result).pipe(
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
