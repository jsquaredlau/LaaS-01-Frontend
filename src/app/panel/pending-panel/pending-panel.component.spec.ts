import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPanelComponent } from './pending-panel.component';

describe('PendingPanelComponent', () => {
  let component: PendingPanelComponent;
  let fixture: ComponentFixture<PendingPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
