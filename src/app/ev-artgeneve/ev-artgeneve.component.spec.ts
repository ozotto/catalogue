import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvArtgeneveComponent } from './ev-artgeneve.component';

describe('EvArtgeneveComponent', () => {
  let component: EvArtgeneveComponent;
  let fixture: ComponentFixture<EvArtgeneveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvArtgeneveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvArtgeneveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
