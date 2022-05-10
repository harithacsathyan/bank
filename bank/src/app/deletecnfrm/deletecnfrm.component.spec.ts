import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletecnfrmComponent } from './deletecnfrm.component';

describe('DeletecnfrmComponent', () => {
  let component: DeletecnfrmComponent;
  let fixture: ComponentFixture<DeletecnfrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletecnfrmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletecnfrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
