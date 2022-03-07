import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandicapDetailsComponent } from './handicap-details.component';

describe('HandicapDetailsComponent', () => {
  let component: HandicapDetailsComponent;
  let fixture: ComponentFixture<HandicapDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HandicapDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandicapDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
