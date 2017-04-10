import { Component, OnInit } from '@angular/core';

import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from "angularfire2";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  public items: FirebaseListObservable<any>;
  private businessName: string;

  constructor(private af: AngularFire, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.businessName = this.route.snapshot.params['business'];
    this.items = this.af.database.list('/businesses/' + this.businessName + '/activeSchemes');
    this.items.subscribe( result => {
      console.log(result);
    });
  }

  public seeDetails(item: any): void {
    this.router.navigate([this.businessName + '/activated/' + item.$key]);
  }

}
