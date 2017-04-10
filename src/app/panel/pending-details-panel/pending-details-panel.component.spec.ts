import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDetailsPanelComponent } from './pending-details-panel.component';

describe('PendingDetailsPanelComponent', () => {
  let component: PendingDetailsPanelComponent;
  let fixture: ComponentFixture<PendingDetailsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingDetailsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDetailsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
