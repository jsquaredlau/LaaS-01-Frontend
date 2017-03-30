import {Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../assets/hamburgers.min.css', '../assets/buttons.css'],
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent {

  hamburgerOpen = false;

  toggleMenu(sidenav: any): void {
    this.hamburgerOpen = !this.hamburgerOpen;
    sidenav.toggle();
  }

  closeHamburger(): void {
    this.hamburgerOpen = false;
    console.log('lel');
  }

  showActiveDashboard(): void {

  }

  showDeactiveDashboard(): void {

  }

  showRequestsDasboard(): void {
    
  }

}

