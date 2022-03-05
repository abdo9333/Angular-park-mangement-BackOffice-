import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreesListComponent } from './trees-list.component';

describe('TreesListComponent', () => {
  let component: TreesListComponent;
  let fixture: ComponentFixture<TreesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
