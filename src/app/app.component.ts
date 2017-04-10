import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../assets/hamburgers.min.css', '../assets/buttons.css'],
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent implements OnInit{

  public hamburgerOpen: boolean = false;
  public selectedValue: string;

  public businesses = [
    {value: 'BASYXLab', viewValue: 'BASYXLab'},
    {value: 'NeikidFyre', viewValue: 'NeikidFyre'},
    {value: 'Ataraxia', viewValue: 'Ataraxia'}
  ];

  constructor(af: AngularFire, private router: Router) {}

  ngOnInit(){
    this.selectedValue = this.businesses[0].viewValue;
  }

  public onSelect(business) {
    this.router.navigate(['/', business]);
  }

  public toggleMenu(sidenav: any): void {
    this.hamburgerOpen = !this.hamburgerOpen;
    sidenav.toggle();
  }

  public closeHamburger(): void {
    this.hamburgerOpen = false;
    console.log('lel');
  }

}

