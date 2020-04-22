import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcontainerComponent } from './testcontainer.component';

describe('TestcontainerComponent', () => {
  let component: TestcontainerComponent;
  let fixture: ComponentFixture<TestcontainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcontainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
