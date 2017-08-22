import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewNewsComponent } from './preview-news.component';

describe('PreviewNewsComponent', () => {
  let component: PreviewNewsComponent;
  let fixture: ComponentFixture<PreviewNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
