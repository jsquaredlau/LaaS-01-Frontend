import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivePanelComponent } from './deactive-panel.component';

describe('DeactivePanelComponent', () => {
  let component: DeactivePanelComponent;
  let fixture: ComponentFixture<DeactivePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
