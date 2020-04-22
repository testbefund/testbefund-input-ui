import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.state';
import {TestbefundSelectors} from '../../store/testbefund.selectors';
import {TestbefundActions} from '../../store/testbefund.actions';
import {TestContainerWriteT} from '../../generated/testbefund-api';
import {SelectItem} from 'primeng/api';
import {TestCase} from '../../generated/testbefund-api/model/testCase';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, map} from 'rxjs/operators';

@Component({
  selector: 'app-testcontainer',
  templateUrl: './testcontainer.component.html',
  styleUrls: ['./testcontainer.component.css']
})
export class TestcontainerComponent implements OnInit, OnDestroy {

  writeId$: Observable<string>;
  container$: Observable<TestContainerWriteT>;

  writeIdsFromRoute$: Observable<string>;
  writeIdsFromInput$: Subject<string> = new Subject();

  availableStates: SelectItem[] = [
    {
      value: 'ISSUED',
      label: 'Ausgestellt'
    },
    {
      value: 'CONFIRM_POSITIVE',
      label: 'Positiv'
    },
    {
      value: 'CONFIRM_NEGATIVE',
      label: 'Negativ'
    },
  ];

  routeSubscription: Subscription;

  constructor(private store: Store<AppState>, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.writeId$ = this.store.select(TestbefundSelectors.selectWriteId);
    this.container$ = this.store.select(TestbefundSelectors.selectCurrentContainer);

    this.routeSubscription = this.activatedRoute.queryParams.pipe(
      map(v => v.writeId),
      debounceTime(500),
    ).subscribe((writeId: string) => {
      this.store.dispatch(TestbefundActions.setWriteId({writeId}));
      if (!!writeId && writeId.length > 10) {
        this.store.dispatch(TestbefundActions.loadCurrentContainer());
      }
    });
  }

  handleWriteIdChange(writeId: string) {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {writeId},
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  handleLoadContainer() {
    this.store.dispatch(TestbefundActions.loadCurrentContainer());
  }

  handleStatusChange(status: TestCase.CurrentStatusEnum, testCase: TestCase) {
    this.store.dispatch(TestbefundActions.updateTest({testCase, status}));
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.handleLoadContainer();
    }
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
