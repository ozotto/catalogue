import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysFileuploadComponent } from './sys-fileupload.component';

describe('SysFileuploadComponent', () => {
  let component: SysFileuploadComponent;
  let fixture: ComponentFixture<SysFileuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SysFileuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysFileuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
