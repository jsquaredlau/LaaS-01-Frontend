import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {

  title = 'Hola mon amis!';
  subtitle = "I'm not that racist!";

  constructor() { }

  ngOnInit() {
  }

}
