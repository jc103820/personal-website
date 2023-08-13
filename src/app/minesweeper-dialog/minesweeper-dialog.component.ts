import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-minesweeper-dialog',
  templateUrl: './minesweeper-dialog.component.html',
  styleUrls: ['./minesweeper-dialog.component.scss'],
})
export class MinesweeperDialogComponent {
  constructor(public dialogRef: MatDialogRef<MinesweeperDialogComponent>) {}

}