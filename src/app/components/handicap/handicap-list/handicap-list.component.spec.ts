import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandicapListComponent } from './handicap-list.component';

describe('HandicapListComponent', () => {
  let component: HandicapListComponent;
  let fixture: ComponentFixture<HandicapListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HandicapListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandicapListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
