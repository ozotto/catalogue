import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitorDetailComponent } from './exhibitor-detail.component';

describe('ExhibitorDetailComponent', () => {
  let component: ExhibitorDetailComponent;
  let fixture: ComponentFixture<ExhibitorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExhibitorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
