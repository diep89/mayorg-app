import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaborarPage } from './colaborar.page';

describe('ColaborarPage', () => {
  let component: ColaborarPage;
  let fixture: ComponentFixture<ColaborarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColaborarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaborarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
