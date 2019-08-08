import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordPage } from './resetpassword.page';

describe('ResetpasswordPage', () => {
  let component: ResetpasswordPage;
  let fixture: ComponentFixture<ResetpasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpasswordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
