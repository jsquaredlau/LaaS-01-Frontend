import { Injectable } from '@angular/core';
import { AwesomeHttpService } from 'ng2-awesome-http';
import { Observable } from "rxjs";
import {Headers} from "@angular/http";



@Injectable()
export class ContractService {

  private contractsUrl = 'http://localhost:3000/api/v1/business';


  constructor (private awesomeHttpService: AwesomeHttpService) {}

  public deployContract(form): Observable<any> {
    console.log(form);
    const headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.awesomeHttpService.post(this.contractsUrl + '/' + 'BASYXLab' + '/' + form.schemeType + '/' + form.schemeName + '/' + 'deploy', {
        description: form.description,
        origin: form.origin,
        token: form.tokenName,
        region: form.region,
        contractKey: form.contractKey,
        accounts: form.accounts
      }, {headers: headers})
      .map(res => {
        res
      })
      .catch((error:any) => Observable.throw(error.error || 'Server error'));
  }

}
