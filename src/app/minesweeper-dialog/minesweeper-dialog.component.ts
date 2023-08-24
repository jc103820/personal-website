import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-minesweeper-dialog',
  templateUrl: './minesweeper-dialog.component.html',
  styleUrls: ['./minesweeper-dialog.component.scss'],
})
export class MinesweeperDialogComponent {
  rows: number = 0;
  columns: number = 0;
  grid: Cell[][] = [];

  constructor(public dialogRef: MatDialogRef<MinesweeperDialogComponent>) {
    this.generateGrid();
  }

  generateGrid(): void {
    this.columns = 20;
    this.rows = 10;
    this.grid = new Array(this.columns);

    for (let i = 0; i < this.columns; i++) {
      this.grid[i] = new Array(this.rows);
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j] = new Cell();
      }
    }

    this.printGrid();
  }

  printGrid(): void {
    console.log("Grid:");
    for (let i = 0; i < this.rows; i++) {
      let rowString: string = `r${i}   `;
      for (let j = 0; j < this.columns; j++) {
        rowString = rowString.concat(` ${this.grid[j][i].content}`);
      }
      console.log(rowString);
    }
  }
}

class Cell {
  content: string = "*";
  isMine: boolean = false;
  isFlagged: boolean = false;
  isRevealed: boolean = false;
  numBombs: number = 0;
  color: string = "green";

  constructor() {}
}