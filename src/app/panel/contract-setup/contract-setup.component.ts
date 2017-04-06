import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContractService } from '../../shared/contract.service';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-contract-setup',
  templateUrl: './contract-setup.component.html',
  styleUrls: ['./contract-setup.component.scss']
})
export class ContractSetupComponent implements OnInit {

  private tokenChosen: boolean;
  private fxChosen: boolean;
  private rewardMileChosen: boolean;
  private step1: boolean;
  private awaitingDeployment: boolean;

  constructor(private contractService: ContractService, public snackBar: MdSnackBar) {}

  ngOnInit() {
    this.tokenChosen = false;
    this.fxChosen = false;
    this.rewardMileChosen = false;
    this.step1 = false;
    this.awaitingDeployment = false;
  }

  public schemeChosen(scheme: string): void {
    switch(scheme) {
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
    form.value['region'] = 'JPN';
    form.value['origin'] = 'LaaS1';
    form.value['contractKey'] = 0;
    form.value['accounts'] = [];
    if (this.tokenChosen) {
      this.contractService.deployVault(form.value)
        .subscribe(
          () => {
            this.snackBar.open('Vault Successfully Deployed', 'dismiss', {duration:2000});
            this.awaitingDeployment = false;
          },
          err => {
            console.log(err);
            this.snackBar.open('It failed :(', 'dismiss', {duration:1000});
            this.awaitingDeployment = false;
          }
        );
    } else if (this.fxChosen) {
      this.contractService.deployFx(form.value)
        .subscribe(
          () => {
            this.snackBar.open('Fx with ' + form.value['partnerName'] + ' deployed', 'dismiss', {duration:2000});
            this.awaitingDeployment = false;
          },
          err => {
            console.log(err);
            this.snackBar.open('It failed :(', 'dismiss', {duration:1000});
            this.awaitingDeployment = false;
          }
        );
    }// else if (this.rewardMileChosen){
    //  form.value['contractType'] = 'rewardMile';
    //}

    return;
  }
}
