import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Headers, RequestOptions, Response, Http } from "@angular/http";
import { environment } from '../../environments/environment';



@Injectable()
export class ContractService {

  private contractsUrl = environment.apiUrl + 'business';

  constructor(private http: Http) { }

  public deployVault(form): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions(({ headers: headers }));
    console.log(this.contractsUrl + '/' + form.owner + '/' + 'vault' + '/' + form.schemeName + '/' + 'deploy');
    return this.http
      .post(
      this.contractsUrl + '/' + form.owner + '/' + 'vault' + '/' + form.schemeName + '/' + 'deploy',
      {
        schemeName: form.schemeName,
        description: form.description,
        token: form.tokenName
      },
      options
      )
      .map(this.extractData)
      .catch(this.handleError);
  }

  public deployFx(form): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions(({ headers: headers }));

    return this.http
      .post(
      this.contractsUrl + '/' + form.owner + '/' + 'fx' + '/' + form.schemeName + '/' + 'deploy',
      {
        owner: form.owner,
        requestedPartner: form.requestedPartner,
        schemeName: form.schemeName,
        contractType: form.contractType,
        description: form.description,
        instructions: form.instructions,
        requiredInputs: form.requiredInputs,
        toPartnerFx: form.toPartnerFx,
        toOwnerFx: form.toOwnerFx,
        vaultAddress: form.vaultAddress,
      },
      options
      )
      .map(this.extractData)
      .catch(this.handleError);
  }

  public deployRewardMile(form): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions(({ headers: headers }));
    console.log(form);
    return this.http
      .post(
      this.contractsUrl + '/' + form.owner + '/' + 'rewardMile' + '/' + form.schemeName + '/' + 'deploy',
      {
        owner: form.owner,
        requestedPartner: form.requestedPartner,
        schemeName: form.schemeName,
        contractType: form.contractType,
        description: form.description,
        instructions: form.instructions,
        requiredInputs: form.requiredInputs,
        vaultAddress: form.vaultAddress,
        ownerRewardAllocation: form.ownerRewardAllocation,
        partners: form.partners
      },
      options
      )
      .map(this.extractData)
      .catch(this.handleError);
  }

  public acceptCollaborationRequest(business: string, contractOwner: string, contractType: string, schemeName: string, contractRequiredInputs): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions(({ headers: headers }));
    console.log(contractType);
    return this.http
      .post(
      this.contractsUrl + '/collaboration/' + business + '/accept/' + schemeName,
      {
        owner: contractOwner,
        contractType: contractType,
        requiredInputs: contractRequiredInputs,
      },
      options
      )
      .map(this.extractData)
      .catch(this.handleError);
  }

  public rejectCollaborationRequest(business: string, contractType: string, schemeName: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions(({ headers: headers }));

    return this.http
      .post(
      this.contractsUrl + '/collaboration/' + business + '/reject/' + schemeName,
      {
        contractType: contractType,
      },
      options
      )
      .map(this.extractData)
      .catch(this.handleError);
  }

  public deactivateContract(business: string, schemeName): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions(({ headers: headers }));
    return this.http
      .post(this.contractsUrl + '/' + business + '/scheme/deactivate', { schemeName: schemeName }, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
