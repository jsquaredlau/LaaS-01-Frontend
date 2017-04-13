import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, RouterLink, Router} from "@angular/router";
import {AngularFire, FirebaseObjectObservable} from "angularfire2";
import {MdSnackBar} from "@angular/material";
import {ContractService} from "../../shared/contract.service";

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
  public requester: string;
  public toPartnerFx: number;
  public toOwnerFx: number;
  public contractType: string;
  private awaitingResponse: boolean;

  constructor(private route: ActivatedRoute,
              private af: AngularFire,
              private contractService: ContractService,
              public snackBar: MdSnackBar,
              private router: Router
  ) { }

  ngOnInit() {
    this.awaitingResponse = false;
    this.businessName = this.route.snapshot.params['business'];
    this.schemeName = this.route.snapshot.params['scheme'];
    this.item = this.af.database.object('/schemes/' + this.businessName + '/' + this.schemeName);
    this.item.subscribe( result => {
      if (result.contractType === 'fx') {
        this.isFx = true;
        this.requester = result.requester;
      }

      this.contractType = result.contractType;
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

  public nullifyContract(): void {
    this.awaitingResponse = true;
    this.contractService.rejectCollaborationRequest(this.businessName, this.requester, this.contractType, this.schemeName.replace('%20', ' '))
      .subscribe(
        (result) => {
          console.log(result);
          this.snackBar.open('Collab with ' + this.requester + ' has been voided', 'dismiss', {duration:2000});
          this.awaitingResponse = false;
          this.router.navigate([this.businessName + '/activated']);
        },
        (err) => {
          console.log(err);
          this.snackBar.open('It failed :(', 'dismiss', {duration: 1000});
        }
      );
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

}
