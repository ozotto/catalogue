import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkUpdateComponent } from './artwork-detail.component';

describe('ArtworkCreateComponent', () => {
  let component: ArtworkUpdateComponent;
  let fixture: ComponentFixture<ArtworkUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtworkUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtworkUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
