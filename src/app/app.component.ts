import {Component, ViewEncapsulation, Directive, ElementRef, Output} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../assets/hamburgers.min.css'],
  encapsulation: ViewEncapsulation.None,
})



export class AppComponent {

  toggleMenu(sidenav: any): void {
    sidenav.toggle();
  }
}
