import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  cardName: any;
  constructor() { }

  @Input() title: any;

  ngOnInit() {
    this.cardName = this.title.$key;
  }

  setTitle(title): void {
    // this.title = title;
    console.log(title);
  }

}
