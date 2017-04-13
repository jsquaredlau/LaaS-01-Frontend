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

  public item: FirebaseObjectObservable<any>;

  public isFx: boolean;
  public schemeName: string;
  public requester: string;
  public contractType: string;
  public description: string;
  public instructions: string;
  public requiredInputs: any;
  public inputResponses: any;
  public fxRate: string;

  constructor(private contractService: ContractService, public snackBar: MdSnackBar, private route: ActivatedRoute, private af: AngularFire) {}

  ngOnInit() {
    this.awaitingResponse = false;
    this.businessName = this.route.snapshot.params['business'];
    this.schemeName = this.route.snapshot.params['scheme'];
    this.inputResponses = {};

    this.item = this.af.database.object('/schemes/' + this.businessName + '/collaborationRequests' + '/' + this.schemeName);
    this.item.subscribe(result => {
      console.log(result);
      this.contractType = result.contractType;
      this.requester = result.requester;
      this.description = result.description;
      this.instructions = result.instructions;
      if (result.contractType === 'fx') {
        this.isFx = true;
        this.requiredInputs = result.requiredInputs;
        for (let input of result.requiredInputs) {
          console.log(input);
          this.inputResponses[input] = null;
        }
        this.fxRate = result.toPartnerFx + ':' + result.toOwnerFx;
      }
    });

  }

  public acceptRequest(form: NgForm): void {
    console.log(form.value);
    form.value['owner'] = this.businessName;
    this.awaitingResponse = true;
    this.contractService.acceptCollaborationRequest(this.businessName, this.requester, this.contractType, this.schemeName.replace('%20', ' '), this.inputResponses)
      .subscribe(
        () => {
          this.snackBar.open('Collab with ' + form.value['requester'] + ' has been accepted', 'dismiss', {duration:2000});
          this.awaitingResponse = false;
        },
        (err) => {
          console.log(err);
          this.snackBar.open('It failed :(', 'dismiss', {duration: 1000});
        }
      );
  }
}
