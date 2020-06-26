import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {Action, ActionReducerMap, StoreModule} from '@ngrx/store';
import {testbefundReducer} from './store/testbefund.reducer';
import {AppState} from './app.state';
import {EffectsModule} from '@ngrx/effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TestcontainerComponent} from './components/testcontainer/testcontainer.component';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {SelectButtonModule} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';
import {TestbefundEffects} from './store/testbefund.effects';
import {TestService} from './service/test.service';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {TabMenuModule} from 'primeng/tabmenu';
import {BASE_PATH} from './generated/testbefund-api';

const reducers: ActionReducerMap<AppState, Action> = {
  testbefund: testbefundReducer
};

// From docker generated config.js
declare const TESTBEFUND_API_URL: string;

@NgModule({
  declarations: [
    AppComponent,
    TestcontainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '**',
        component: TestcontainerComponent
      },
      {
        path: '**',
        component: TestcontainerComponent
      }
    ]),
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([TestbefundEffects]),
    BrowserAnimationsModule,
    InputTextModule,
    ButtonModule,
    SelectButtonModule,
    ToastModule,
    TabMenuModule
  ],
  providers: [
    TestbefundEffects,
    TestService,
    MessageService,
    {
      provide: BASE_PATH,
      useValue: TESTBEFUND_API_URL
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
