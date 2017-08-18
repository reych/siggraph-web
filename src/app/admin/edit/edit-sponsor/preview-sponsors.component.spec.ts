import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSponsorsComponent } from './preview-sponsors.component';

describe('PreviewSponsorsComponent', () => {
  let component: PreviewSponsorsComponent;
  let fixture: ComponentFixture<PreviewSponsorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewSponsorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
