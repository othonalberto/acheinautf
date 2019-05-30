import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaPostPage } from './edita-post.page';

describe('EditaPostPage', () => {
  let component: EditaPostPage;
  let fixture: ComponentFixture<EditaPostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaPostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
