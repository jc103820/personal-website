import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-minesweeper-dialog',
  templateUrl: './minesweeper-dialog.component.html',
  styleUrls: ['./minesweeper-dialog.component.scss'],
})
export class MinesweeperDialogComponent {
  resetButtonContent: string = '☺';
  rows: number = 0;
  columns: number = 0;
  initialClick: boolean = true;

  grid: Cell[][] = [];

  constructor(public dialogRef: MatDialogRef<MinesweeperDialogComponent>) {
    this.resetGrid();
  }

  resetGrid(): void {
    this.resetButtonContent = '☺';
    this.generateGrid();
    this.initialClick = true;
  }

  generateGrid(): void {
    this.columns = 40;
    this.rows = 15;
    this.grid = [];
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
  }

  updateAdjacentBombCounts(column: number, row: number):void {
    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
        let nextRow = row + r;
        let nextCol = column + c;
        let inRowBounds = nextRow < this.rows && nextRow >= 0;
        let inColBounds = nextCol < this.columns && nextCol >= 0;
        if(inRowBounds && inColBounds) {
          this.grid[nextCol][nextRow].numBombs++;
        }
      }
    }
  }

  tryToRevealCell(column: number, row: number){
    if (this.grid[column][row].isRevealed) {
      this.revealSurroundingCells(column, row);
    } else {
      this.revealCell(column, row);
    }
  }

  revealCell(column: number, row: number): void {
    if (this.grid[column][row].isFlagged) return;

    if (this.initialClick){
      this.placeMines(column, row);
      this.initialClick = false;
    }

    this.grid[column][row].isRevealed = true;

    if (this.grid[column][row].isMine) {
      this.bombClick(column, row);
    } else {
      this.searchNearbyCells(column, row);
    }
  }

  flagCell(event: MouseEvent, column: number, row: number): void {
    if (this.grid[column][row].isRevealed) return;

    event.preventDefault();

    if (this.grid[column][row].isFlagged) {
      this.grid[column][row].content = "";
      this.grid[column][row].isFlagged = false;
      this.grid[column][row].color = this.textColor(this.grid[column][row].numBombs);
    } else {
      if (this.grid[column][row].isRevealed === false){
        this.grid[column][row].content = "⚑";
        this.grid[column][row].color = "red";
        this.grid[column][row].isFlagged = true;
      }
    }
  }

  revealSurroundingCells(column: number, row: number): void {
    let numberOfFlags: number = 0;

    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        let nextRow = row + r;
        let nextCol = column + c;
        let inRowBounds = nextRow < this.rows && nextRow >= 0;
        let inColBounds = nextCol < this.columns && nextCol >= 0;
        if(inRowBounds && inColBounds) {
          if(this.grid[nextCol][nextRow].isFlagged) numberOfFlags++;
        }
      }
    }

    if(numberOfFlags === this.grid[column][row].numBombs){
      for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
          let nextRow = row + r;
          let nextCol = column + c;
          let inRowBounds = nextRow < this.rows && nextRow >= 0;
          let inColBounds = nextCol < this.columns && nextCol >= 0;
          if(inRowBounds && inColBounds) {
            this.revealCell(nextCol, nextRow);
          }
        }
      }
    }
  }

  async searchNearbyCells(col: number, row: number): Promise<void> {
    const visited: boolean[][] = new Array(this.columns);

    for (let i = 0; i < this.columns; i++) {
      visited[i] = new Array(this.rows);
      for (let j = 0; j < this.rows; j++) {
        visited[i][j] = false;
      }
    }

    let q: Coordinate[] = [new Coordinate(row, col)];

    // Breadth first search
    while(!(q.length === 0)) {;
      let cell: any = q.pop()

      if(visited[cell.column][cell.row]) continue;

      visited[cell.column][cell.row] = true;

      if (this.grid[cell.column][cell.row].numBombs > 0) {
        this.grid[cell.column][cell.row].isRevealed = true;
        this.grid[cell.column][cell.row].content = this.grid[cell.column][cell.row].numBombs.toString();
        this.grid[cell.column][cell.row].color = this.textColor(this.grid[cell.column][cell.row].numBombs);
      }


      if (this.grid[cell.column][cell.row].numBombs === 0) {
        this.grid[cell.column][cell.row].isRevealed = true;
        this.grid[cell.column][cell.row].content = "";

        // Reveal surrounding cells
        for (let r = -1; r <= 1; r++) {
          for (let c = -1; c <= 1; c++) {
            let nextRow = cell.row + r;
            let nextCol = cell.column + c;
            let inRowBounds = nextRow < this.rows && nextRow >= 0;
            let inColBounds = nextCol < this.columns && nextCol >= 0;
            if(inRowBounds && inColBounds) {
              q.push(new Coordinate(nextRow, nextCol));
            }
          }
        }
      }
    }
  }

  bombClick(column: number, row: number): void {
    this.resetButtonContent = '☹';
    this.grid[column][row].isClickedMine = true;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if(this.grid[j][i].isMine){
          this.grid[j][i].content = '💣';
          this.grid[j][i].color = 'black';
          this.grid[j][i].isRevealed = true;
        }
      }
    }
  }

  textColor(numberOfBombs: number): string {
    switch(numberOfBombs) { 
      case 1: return 'blue';
      case 2: return 'green';
      case 3: return 'red';
      case 4: return 'darkblue';
      case 5: return 'darkred';
      case 6: return 'cyan';
      case 7: return 'black';
      case 8: return 'grey';
      default: return 'yellow';
    } 
  }
}

class Cell {
  content: string = "";
  isMine: boolean = false;
  isClickedMine: boolean = false;
  isFlagged: boolean = false;
  isRevealed: boolean = false;
  numBombs: number = 0;
  color: string = "green";

  constructor() {}
}

class Coordinate {
  row: number = 0;
  column: number = 0;
  constructor (row:number, column: number) {
    this.row = row;
    this.column = column;
  }
}