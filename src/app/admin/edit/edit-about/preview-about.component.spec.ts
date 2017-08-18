import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAboutComponent } from './preview-about.component';

describe('PreviewAboutComponent', () => {
  let component: PreviewAboutComponent;
  let fixture: ComponentFixture<PreviewAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
