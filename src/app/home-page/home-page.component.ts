import { Component } from '@angular/core';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { MinesweeperDialogComponent } from '../minesweeper-dialog/minesweeper-dialog.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor (public dialog: MatDialog) {}

  onFlagClick(): void {
    const dialogRef = this.dialog.open(MinesweeperDialogComponent, {
      width: '820px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
