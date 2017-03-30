import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd} from "@angular/router";

import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  title: String;
  subtitle: String;

  constructor(
    private router: Router
  ) {
    this.title = 'Bonjour tout le monde!';
    this.subtitle = 'Comment vas tu?';
  }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event) => {
        console.log(event);
        this.title = event.url;
      })
  }

}
