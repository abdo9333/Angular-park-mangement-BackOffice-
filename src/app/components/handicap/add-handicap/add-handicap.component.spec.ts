import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHandicapComponent } from './add-handicap.component';

describe('AddHandicapComponent', () => {
  let component: AddHandicapComponent;
  let fixture: ComponentFixture<AddHandicapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddHandicapComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHandicapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
