import { Component, OnInit } from '@angular/core';
import {FirebaseObjectObservable, FirebaseListObservable, AngularFire} from "angularfire2";

@Component({
  selector: 'app-deactive-panel',
  templateUrl: './deactive-panel.component.html',
  styleUrls: ['./deactive-panel.component.scss']
})
export class DeactivePanelComponent implements OnInit {

  item: FirebaseObjectObservable<any>;
  items: FirebaseListObservable<any>;
  af: AngularFire;
  constructor(af: AngularFire) {
    this.af = af;
  }

  ngOnInit() {
    this.items = this.af.database.list('/businesses/BASYXLab/deactiveSchemes');
    this.items.subscribe( result => {
      console.log(result);
    });
  }

}
