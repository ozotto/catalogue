import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvArtmontecarloComponent } from './ev-artmontecarlo.component';

describe('EvArtmontecarloComponent', () => {
  let component: EvArtmontecarloComponent;
  let fixture: ComponentFixture<EvArtmontecarloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvArtmontecarloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvArtmontecarloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
