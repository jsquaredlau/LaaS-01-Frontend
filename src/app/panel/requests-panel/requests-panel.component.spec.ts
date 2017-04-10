import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsPanelComponent } from './requests-panel.component';

describe('RequestsPanelComponent', () => {
  let component: RequestsPanelComponent;
  let fixture: ComponentFixture<RequestsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
