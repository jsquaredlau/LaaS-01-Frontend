import { Component, OnInit } from '@angular/core';

import { CardComponent } from '../card/card.component';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  item: FirebaseObjectObservable<any>;
  items: FirebaseListObservable<any>;
  af: AngularFire;
  constructor(af: AngularFire) {
    this.af = af;
  }

  ngOnInit() {
    this.items = this.af.database.list('/businesses/BASYXLab/activeSchemes');
    this.items.subscribe( result => {
      console.log(result);
    });
  }

}
