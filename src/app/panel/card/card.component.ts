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
    if (this.title !== undefined){
      if (typeof this.title === 'string') {
        this.cardName = this.title;
      } else if (typeof this.title === 'object') {
        this.cardName = this.title.$key;
      }
    }
  }

  setTitle(title): void {
    // this.title = title;
    console.log(title);
  }

}
