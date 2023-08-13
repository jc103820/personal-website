import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesweeperDialogComponent } from './minesweeper-dialog.component';

describe('MinesweeperDialogComponent', () => {
  let component: MinesweeperDialogComponent;
  let fixture: ComponentFixture<MinesweeperDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinesweeperDialogComponent]
    });
    fixture = TestBed.createComponent(MinesweeperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
