import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusPostsPage } from './meus-posts.page';

describe('MeusPostsPage', () => {
  let component: MeusPostsPage;
  let fixture: ComponentFixture<MeusPostsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusPostsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusPostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
