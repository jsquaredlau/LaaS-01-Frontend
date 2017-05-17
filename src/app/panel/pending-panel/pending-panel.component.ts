import { Component, OnInit } from '@angular/core';
import {FirebaseListObservable, AngularFire} from "angularfire2";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pending-panel',
  templateUrl: './pending-panel.component.html',
  styleUrls: ['./pending-panel.component.scss']
})
export class PendingPanelComponent implements OnInit {

  public items: FirebaseListObservable<any>;
  private businessName: string;

  constructor(private af: AngularFire, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.businessName = this.route.snapshot.params['business'].replace('%20', ' ');
    this.items = this.af.database.list('/businesses/' + this.businessName + '/pendingSchemes');
    this.items.subscribe(result => {
      console.log(result);
    });
  }

  public seeDetails(item: any): void {
    this.router.navigate([this.businessName + '/pending/' + item.$key]);
  }

}
