import { Injectable } from '@angular/core';
import { AwesomeHttpService } from 'ng2-awesome-http';
import { Observable } from "rxjs";
import {Headers} from "@angular/http";



@Injectable()
export class ContractService {

  private contractsUrl = 'http://localhost:3000/api/v1/business';


  constructor (private awesomeHttpService: AwesomeHttpService) {}

  public deployVault(form): Observable<any> {
    const headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.awesomeHttpService.post(this.contractsUrl + '/' + 'BASYXLab' + '/' + 'vault' + '/' + form.schemeName + '/' + 'deploy', {
        description: form.description,
        origin: form.origin,
        token: form.tokenName,
        region: form.region,
        contractKey: form.contractKey,
        accounts: form.accounts
      }, {headers: headers})
      .map(res => res)
      .catch((error:any) => Observable.throw(error.error || 'Server error'));
  }

  public deployFx(form): Observable<any> {
    const headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    console.log(form.vaultAddress, form.partnerAddress, form.toPartnerX, form.toOwnerX);

    return this.awesomeHttpService.post(this.contractsUrl + '/' + 'BASYXLab' + '/' + 'fx' + '/' + form.schemeName + '/' + 'deploy', {
      owner: form.owner,
      description: form.description,
      origin: form.origin,
      token: form.tokenName,
      region: form.region,
      contractKey: form.contractKey,
      vaultAddress: form.vaultAddress,
      partnerAddress: form.partnerAddress,
      toPartnerX: form.toPartnerFx,
      toOwnerX: form.toOwnerFx,
    }, {headers: headers})
      .map(res => res)
      .catch((error:any) => Observable.throw(error.error || 'Server error'));
  }

}
