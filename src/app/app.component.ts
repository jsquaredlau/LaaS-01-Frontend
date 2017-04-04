import { Component, ViewEncapsulation } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../assets/hamburgers.min.css', '../assets/buttons.css'],
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent {

  hamburgerOpen = false;
  public result: any;


  constructor(af: AngularFire) {

  }

  toggleMenu(sidenav: any): void {
    this.hamburgerOpen = !this.hamburgerOpen;
    sidenav.toggle();
  }

  closeHamburger(): void {
    this.hamburgerOpen = false;
    console.log('lel');
  }

}

