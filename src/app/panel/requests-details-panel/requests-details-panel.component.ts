import { Component, OnInit } from '@angular/core';
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {ContractService} from "../../shared/contract.service";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'app-requests-details-panel',
  templateUrl: './requests-details-panel.component.html',
  styleUrls: ['./requests-details-panel.component.scss']
})
export class RequestsDetailsPanelComponent implements OnInit {
  private businessName: string;
  private awaitingResponse: boolean;
  private item: FirebaseObjectObservable<any>;

  public schemeName: string;
  public provider: string;
  public owner: string;
  public contractType: string;
  public description: string;
  public instructions: string;
  public requiredInputs: any;

  public isFx: boolean;
  public fxRate: string;

  public isRewardMile: boolean;
  public partners: any;

  constructor(private contractService: ContractService, public snackBar: MdSnackBar, private route: ActivatedRoute, private af: AngularFire, private router: Router) {}

  ngOnInit() {
    this.awaitingResponse = false;
    this.businessName = this.route.snapshot.params['business'];
    this.schemeName = this.route.snapshot.params['scheme'];

    this.item = this.af.database.object('/schemes/' + this.businessName + '/collaborationRequests' + '/' + this.schemeName);
    this.item.subscribe(result => {
      this.owner = result.owner;
      this.provider = result.provider;
      this.description = result.description;
      this.instructions = result.instructions;
      this.contractType = result.contractType;
      this.requiredInputs = result.requiredInputs;
      if (result.contractType === 'fx') {
        this.isFx = true;
        this.fxRate = result.toPartnerFx + ':' + result.toOwnerFx;
      } else if (result.contractType === 'rewardMile') {
        this.isRewardMile = true;
        this.partners = result.partners;
      }
    });

  }

  public acceptRequest(form: NgForm): void {
    console.log(form.value);
    form.value['owner'] = this.businessName;
    this.awaitingResponse = true;
    this.contractService.acceptCollaborationRequest(this.businessName, this.owner, this.contractType, this.schemeName.replace('%20', ' '), form.value)
      .subscribe(
        () => {
          this.snackBar.open('Collab with ' + form.value['owner'] + ' has been accepted', 'dismiss', {duration:2000});
          this.awaitingResponse = false;
          this.router.navigate([this.businessName + '/activated']);
        },
        (err) => {
          console.log(err);
          this.snackBar.open('It failed :(', 'dismiss', {duration: 1000});
        }
      );
  }
}
