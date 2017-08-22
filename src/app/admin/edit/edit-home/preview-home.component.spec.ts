import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewHomeComponent } from './preview-home.component';

describe('PreviewHomeComponent', () => {
  let component: PreviewHomeComponent;
  let fixture: ComponentFixture<PreviewHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
