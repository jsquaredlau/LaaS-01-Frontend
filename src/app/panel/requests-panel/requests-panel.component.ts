import { Component, OnInit } from '@angular/core';
import {FirebaseObjectObservable, AngularFire, FirebaseListObservable} from "angularfire2";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-requests-panel',
  templateUrl: './requests-panel.component.html',
  styleUrls: ['./requests-panel.component.scss']
})
export class RequestsPanelComponent implements OnInit {

  private schemes: FirebaseListObservable<any>;
  public items: FirebaseListObservable<any>;
  private businessName: string;

  constructor(private af: AngularFire, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.businessName = this.route.snapshot.params['business'].replace('%20', ' ');
    this.items = this.af.database.list('/businesses/' + this.businessName + '/collaborationRequests');
    this.items.subscribe(result => {
      console.log(result);
    });
  }

  public seeDetails(item: any): void {
    this.router.navigate([this.businessName + '/requests/' + item.$key]);
  }
}
