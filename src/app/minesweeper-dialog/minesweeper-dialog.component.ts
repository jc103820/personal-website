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
  initialClick: boolean = true;

  grid: Cell[][] = [];

  constructor(public dialogRef: MatDialogRef<MinesweeperDialogComponent>) {
    this.generateGrid();
    this.printGrid();
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
  }

  placeMines(column: number, row: number): void {
    const totalMines = ((this.rows * this.columns) / 5);
    console.log(`Total Mines: ${totalMines}`);
    for (let i = 0; i < totalMines; i++) {
      const randomRow = Math.floor(Math.random() * this.rows);
      const randomCol = Math.floor(Math.random() * this.columns);

      let isAlreadyMine = this.grid[randomCol][randomRow].isMine === true;
      let nextToInitialClick = (randomRow <= row + 1 && randomRow >= row - 1) && (randomCol <= column + 1 && randomCol >= column - 1);

      if (!isAlreadyMine && !nextToInitialClick) {
        this.grid[randomCol][randomRow].isMine = true;
        this.updateAdjacentBombCounts(randomCol, randomRow);
      }
    }

    this.printGrid();
  }

  updateAdjacentBombCounts(column: number, row: number):void {
    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
        let nextRow = row + r;
        let nextCol = column + c;
        let inRowBounds = nextRow < this.rows && nextRow >= 0;
        let inColBounds = nextCol < this.columns && nextCol >= 0;
        if(inRowBounds && inColBounds) {
          //console.log(`+1 bombs from ${row},${column} for ${nextRow},${nextCol} `)
          this.grid[nextCol][nextRow].numBombs++;
        }
      }
    }
  }

  revealCell(column: number, row: number): void {
    if(this.initialClick){
      this.placeMines(column, row);
    }
  }

  printGrid(): void {
    console.log("Grid:");
    for (let i = 0; i < this.rows; i++) {
      let rowString: string = `r${i}   `;
      for (let j = 0; j < this.columns; j++) {
        rowString = rowString.concat(` ${this.grid[j][i].numBombs}`);
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