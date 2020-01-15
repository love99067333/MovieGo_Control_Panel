import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CinemaPage } from './cinema.page';

describe('CinemaPage', () => {
  let component: CinemaPage;
  let fixture: ComponentFixture<CinemaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CinemaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CinemaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
