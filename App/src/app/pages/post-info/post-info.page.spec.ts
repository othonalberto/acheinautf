import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostInfoPage } from './post-info.page';

describe('PostInfoPage', () => {
  let component: PostInfoPage;
  let fixture: ComponentFixture<PostInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
