import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContractService } from '../../shared/contract.service';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-contract-setup',
  templateUrl: './contract-setup.component.html',
  styleUrls: ['./contract-setup.component.scss']
})
export class ContractSetupComponent implements OnInit {

  public tokenChosen: boolean;
  public fxChosen: boolean;
  public rewardMileChosen: boolean;
  public step1: boolean;
  public awaitingDeployment: boolean;
  public business: string;

  constructor(private contractService: ContractService, public snackBar: MdSnackBar, private route: ActivatedRoute) { }

  ngOnInit() {
    this.tokenChosen = false;
    this.fxChosen = false;
    this.rewardMileChosen = false;
    this.step1 = false;
    this.awaitingDeployment = false;
    this.business = this.route.snapshot.params['business'].replace('%20', ' ');
  }

  public schemeChosen(scheme: string): void {
    switch (scheme) {
      case 'token':
        this.tokenChosen = true;
        this.fxChosen = false;
        this.rewardMileChosen = false;
        this.step1 = true;
        break;
      case 'fx':
        this.tokenChosen = false;
        this.fxChosen = true;
        this.rewardMileChosen = false;
        this.step1 = true;
        break;
      case 'rewardMile':
        this.tokenChosen = false;
        this.fxChosen = false;
        this.rewardMileChosen = true;
        this.step1 = true;
        break;
      default:
        this.step1 = false;
        break;
    }
  }

  public deployContract(form: NgForm): void {
    console.log(form.value);
    this.awaitingDeployment = true;
    form.value['owner'] = this.business;
    if (this.tokenChosen) {
      this.contractService.deployVault(form.value)
        .subscribe(
        () => {
          this.snackBar.open('Vault Successfully Deployed', 'dismiss', { duration: 2000 });
          this.awaitingDeployment = false;
        },
        err => {
          console.log(err);
          this.snackBar.open('It failed :(', 'dismiss', { duration: 1000 });
          this.awaitingDeployment = false;
        }
        );
    } else if (this.fxChosen) {
      form.value['contractType'] = 'fx';
      const exchangeRates = form.value['exchangeRate'].split(':');
      form.value['toPartnerFx'] = parseInt(exchangeRates[1]);
      form.value['toOwnerFx'] = parseInt(exchangeRates[0]);
      form.value['requiredInputs'] = form.value['requiredInputs'].split(',');
      this.contractService.deployFx(form.value)
        .subscribe(
        () => {
          this.snackBar.open('Fx with ' + form.value['requestedPartner'] + ' deployed', 'dismiss', { duration: 2000 });
          this.awaitingDeployment = false;
        },
        err => {
          console.log(err);
          this.snackBar.open('It failed :(', 'dismiss', { duration: 1000 });
          this.awaitingDeployment = false;
        }
        );
    } else if (this.rewardMileChosen) {
      form.value['contractType'] = 'rewardMile';
      form.value['requiredInputs'] = form.value['requiredInputs'].split(',');
      form.value['partners'] = form.value['partners'].split(',');
      this.contractService.deployRewardMile(form.value)
        .subscribe(
        () => {
          this.snackBar.open('Reward Mile with ' + form.value['partners'] + ' deployed', 'dismiss', { duration: 2000 });
          this.awaitingDeployment = false;
        },
        err => {
          console.log(err);
          this.snackBar.open('It failed :(', 'dismiss', { duration: 1000 });
          this.awaitingDeployment = false;
        }
        );
    }

    return;
  }
}
