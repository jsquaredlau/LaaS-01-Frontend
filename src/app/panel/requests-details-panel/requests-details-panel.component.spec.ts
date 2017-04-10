import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsDetailsPanelComponent } from './requests-details-panel.component';

describe('RequestsDetailsPanelComponent', () => {
  let component: RequestsDetailsPanelComponent;
  let fixture: ComponentFixture<RequestsDetailsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsDetailsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsDetailsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
