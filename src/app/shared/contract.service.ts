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

    return this.awesomeHttpService.post(this.contractsUrl + '/' + form.owner + '/' + 'vault' + '/' + form.schemeName + '/' + 'deploy', {
        schemeName: form.schemeName,
        description: form.description,
        token: form.tokenName
        // origin: form.origin,
        // token: form.tokenName,
        // region: form.region,
        // contractKey: form.contractKey,
        // accounts: form.accounts
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

    return this.awesomeHttpService.post(this.contractsUrl + '/' + form.owner + '/' + 'fx' + '/' + form.schemeName + '/' + 'deploy', {
      requester: form.owner,
      requestedPartner: form.requestedPartner,
      schemeName: form.schemeName,
      contractType: form.contractType,
      description: form.description,
      instructions: form.instructions,
      requiredInputs: form.requiredInputs,
      toPartnerFx: form.toPartnerFx,
      toOwnerFx: form.toOwnerFx,
      vaultAddress: form.vaultAddress,
      // origin: form.origin,
      // token: form.tokenName,
      // region: form.region,
      // contractKey: form.contractKey,
      // partnerAddress: form.partnerAddress,

    }, {headers: headers})
      .map(res => res)
      .catch((error:any) => Observable.throw(error.error || 'Server error'));
  }

  public acceptCollaborationRequest(business: string, requester: string, contractType: string, schemeName: string, requiredInputs): Observable<any> {
    const headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    console.log(schemeName);

    return this.awesomeHttpService.post(
      this.contractsUrl + '/collaboration/' + business + '/accept/' + schemeName,
      {
        requester: requester,
        contractType: contractType,
        requiredInputs: requiredInputs,
      },
      {headers: headers})
      .map(res => res)
      .catch((error: any) => Observable.throw(error.error || 'Server error in accepting request'));
  }
}
