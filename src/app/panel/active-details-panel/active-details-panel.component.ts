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

  private businessName: string;
  private schemeName: string;
  private awaitingResponse: boolean;
  public item: FirebaseObjectObservable<any>;

  public isVault: boolean;
  public creationDate: string;
  public vaultName: string;
  public token: string;

  public provider: string;
  public owner: string;
  public description: string;
  public instructions: string;
  public contractType: string;
  public isOwner: boolean;

  public isFx: boolean;
  public toPartnerFx: number;
  public toOwnerFx: number;

  public isRewardMile: boolean;
  public partners: Array<String>;


  constructor(private route: ActivatedRoute,
    private af: AngularFire,
    private contractService: ContractService,
    public snackBar: MdSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.awaitingResponse = false;
    this.businessName = this.route.snapshot.params['business'].replace('%20', ' ');
    this.schemeName = this.route.snapshot.params['scheme'];
    this.partners = [];
    this.isOwner = false;

    this.item = this.af.database.object('/schemes/' + this.businessName + '/' + this.schemeName);
    this.item.subscribe(
      (result) => {
        this.contractType = result.contractType;
        this.description = result.description;
        if (result.contractType === 'vault') {
          this.isVault = true;
          this.token = result.token;
          this.creationDate = result.creationDate;
          this.isOwner = true;
        } else {
          this.provider = result.provider;
          this.owner = result.owner;
          this.instructions = result.instructions;
          this.contractType = result.contractType;
          if (this.businessName === this.owner) {
            this.isOwner = true;
          }
          if (result.contractType === 'fx') {
            this.isFx = true;
            this.toPartnerFx = result.toPartnerFx;
            this.toOwnerFx = result.toOwnerFx;
          } else if (result.contractType === 'rewardMile') {
            for (const partner in result.partners) {
              this.partners.push(partner);
            }
            console.log(this.partners);
            this.isRewardMile = true;
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public nullifyContract(): void {
    this.awaitingResponse = true;
    this.contractService.rejectCollaborationRequest(this.businessName, this.contractType, this.schemeName.replace('%20', ' '))
      .subscribe(
      (result) => {
        console.log(result);
        this.snackBar.open('Collab with ' + this.owner + ' has been voided', 'dismiss', { duration: 2000 });
        this.awaitingResponse = false;
        this.router.navigate([this.businessName + '/activated']);
      },
      (err) => {
        console.log(err);
        this.snackBar.open('It failed :(', 'dismiss', { duration: 1000 });
      });
  }

  public destroyContract(): void {
    this.awaitingResponse = true;
    this.contractService.deactivateContract(this.businessName, this.schemeName.replace('%20', ' '))
      .subscribe(
      (result) => {
        this.snackBar.open('Scheme ' + this.schemeName + ' has been terminated', 'dismiss', { duration: 2000 });
        this.awaitingResponse = false;
        this.router.navigate([this.businessName + '/activated']);
      },
      (error) => {
        console.log(error);
        this.snackBar.open('It failed :(', 'dismiss', { duration: 1000 });
        this.awaitingResponse = false;
      });
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

}
