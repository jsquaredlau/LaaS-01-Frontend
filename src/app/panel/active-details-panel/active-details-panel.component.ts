import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AngularFire, FirebaseObjectObservable} from "angularfire2";

@Component({
  selector: 'app-active-details-panel',
  templateUrl: './active-details-panel.component.html',
  styleUrls: ['./active-details-panel.component.scss']
})
export class ActiveDetailsPanelComponent implements OnInit, OnDestroy {

  id: string;
  private sub: any;
  private businessName: string;
  private schemeName: string;
  public item: FirebaseObjectObservable<any>;
  public isFx: boolean;
  public vaultName: string;
  public tokenName: string;
  public origin: string;
  public creationDate: string;
  public expirationDate: string;
  public description: string;
  public region: string;
  public partnerVault: string;
  public partnerName: string;
  public toPartnerFx: number;
  public toOwnerFx: number;

  constructor(private route: ActivatedRoute,
              private af: AngularFire
  ) { }

  ngOnInit() {
    this.businessName = this.route.snapshot.params['business'];
    this.schemeName = this.route.snapshot.params['scheme'];
    this.item = this.af.database.object('/schemes/' + this.businessName + '/' + this.schemeName);
    this.item.subscribe( result => {
      if (result.contractType === 'fx') {
        this.isFx = true;
        // this.partnerName = result.partnerName;
        // this.partnerVault = result.partnerVault;
        // this.toPartnerFx = result.
      }

      this.vaultName = this.schemeName;
      this.tokenName = result.token;
      this.origin = result.origin;
      this.creationDate = result.creationDate;
      this.description = result.description;
      this.region = result.region;

      console.log(result);
    });

    // this.sub = this.route.params.subscribe(params => {
    //   this.id = params['scheme'];
    //   console.log(this.id);
    // });
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

}
