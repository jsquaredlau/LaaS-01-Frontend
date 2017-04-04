import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveDetailsPanelComponent } from './active-details-panel.component';

describe('ActiveDetailsPanelComponent', () => {
  let component: ActiveDetailsPanelComponent;
  let fixture: ComponentFixture<ActiveDetailsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveDetailsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveDetailsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
