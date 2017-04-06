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
    form.value['conractKey'] = 0;
    form.value['accounts'] = [];
    if (this.tokenChosen) {
      form.value['schemeType'] = 'vault';
    } else if (this.fxChosen) {
      form.value['schemeType'] = 'fx';
    }// else if (this.rewardMileChosen){
    //  form.value['contractType'] = 'rewardMile';
    //}
    this.contractService.deployContract(form.value)
      .subscribe(
        deploymentStatus => {
          console.log('it not even in here');
          console.log(deploymentStatus);
          this.snackBar.open('It succeeded! :D', 'dismiss', {duration: 2000});
          this.awaitingDeployment = false;
        }
      );
    return;
  }
}
