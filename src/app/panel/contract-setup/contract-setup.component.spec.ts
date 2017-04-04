import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractSetupComponent } from './contract-setup.component';

describe('ContractSetupComponent', () => {
  let component: ContractSetupComponent;
  let fixture: ComponentFixture<ContractSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
