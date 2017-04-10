import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { PageHeaderComponent } from './page-header/page-header/page-header.component';
import { PanelComponent } from './panel/panel/panel.component';
import { CardComponent } from './panel/card/card.component';
import { NgInitDirective } from './shared/ng-init.directive';
import { AngularFireModule } from "angularfire2";
import { DeactivePanelComponent } from './panel/deactive-panel/deactive-panel.component';
import { ActiveDetailsPanelComponent } from './panel/active-details-panel/active-details-panel.component';
import { ContractComponent } from './contract/contract/contract.component';
import { ContractSetupComponent } from './panel/contract-setup/contract-setup.component';

import { ContractService } from './shared/contract.service';
import { AwesomeHttpModule } from 'ng2-awesome-http';
import { LoginComponent } from './panel/login/login.component';
import { PendingPanelComponent } from './panel/pending-panel/pending-panel.component';
import { PendingDetailsPanelComponent } from './panel/pending-details-panel/pending-details-panel.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: ':business', redirectTo: ':business/activated', pathMatch: 'full' },
  { path: ':business/activated', component:  PanelComponent },
  { path: ':business/deactivated', component:  DeactivePanelComponent },
  { path: ':business/requests', component:  PanelComponent },
  { path: ':business/pending', component: PendingPanelComponent},
  { path: ':business/activated/:scheme', component: ActiveDetailsPanelComponent },
  { path: ':business/pending/:scheme', component: PendingDetailsPanelComponent },
  { path: ':business/contract/setup', component: ContractSetupComponent }

];

const firebaseConfig = {
  apiKey: "AIzaSyBQNNPknNbL21FqtJLDbZpd9DvC3Nqudnk",
  authDomain: "laas-1.firebaseapp.com",
  databaseURL: "https://laas-1.firebaseio.com",
  projectId: "laas-1",
  storageBucket: "laas-1.appspot.com",
  messagingSenderId: "622638005740"
};

@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PanelComponent,
    CardComponent,
    NgInitDirective,
    DeactivePanelComponent,
    ActiveDetailsPanelComponent,
    ContractComponent,
    ContractSetupComponent,
    LoginComponent,
    PendingPanelComponent,
    PendingDetailsPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AwesomeHttpModule
  ],
  entryComponents: [
    ContractComponent
  ],
  providers: [
    ContractService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
