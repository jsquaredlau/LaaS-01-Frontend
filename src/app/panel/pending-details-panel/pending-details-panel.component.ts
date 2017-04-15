import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AngularFire, FirebaseObjectObservable} from "angularfire2";

@Component({
  selector: 'app-pending-details-panel',
  templateUrl: './pending-details-panel.component.html',
  styleUrls: ['./pending-details-panel.component.scss']
})
export class PendingDetailsPanelComponent implements OnInit {

  private businessName: string;

  public item: FirebaseObjectObservable<any>;

  public isFx: boolean;
  public isRewardMile: boolean;
  public schemeName: string;
  public requestedPartner: string;
  public contractType: string;
  public description: string;
  public instructions: string;
  public requiredInputs: any;
  public toPartnerFx: number;
  public toOwnerFx: number;
  public creationDate: number;
  public status: string;
  public vaultAddress: string;
  public partners: any;

  constructor(private route: ActivatedRoute, private af: AngularFire) {}

  ngOnInit() {
    this.businessName = this.route.snapshot.params['business'];
    this.schemeName = this.route.snapshot.params['scheme'];

    this.item = this.af.database.object('/schemes/' + this.businessName + '/' + this.schemeName);
    this.item.subscribe(result => {
      console.log(result);
      if (result.contractType === 'fx') {
        this.isFx = true;
        this.requestedPartner = result.requestedPartner;
        this.description = result.description;
        this.instructions = result.instructions;
        this.requiredInputs = result.requiredInputs;
        this.toPartnerFx = result.toPartnerFx;
        this.toOwnerFx = result.toOwnerFx;
        this.creationDate = result.creationDate;
        this.status = result.status;
        this.vaultAddress = result.vaultAddress;
      } else if (result.contractType === 'rewardMile') {
        this.isRewardMile = true;
        this.description = result.description;
        this.instructions = result.instructions;
        this.requiredInputs = result.requiredInputs.replace(',', '\n');
        this.partners = result.partners;
        this.status = result.status;
      }

    });

  }
}
