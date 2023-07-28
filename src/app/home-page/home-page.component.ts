import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  onFlagClick():void {
    alert("Eventually there will be minesweeper here, but as for now here is this alert");
  }

}
