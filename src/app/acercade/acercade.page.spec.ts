import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcercadePage } from './acercade.page';

describe('AcercadePage', () => {
  let component: AcercadePage;
  let fixture: ComponentFixture<AcercadePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcercadePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcercadePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
