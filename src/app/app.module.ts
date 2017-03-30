import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { PageHeaderComponent } from './page-header/page-header/page-header.component';
import { PanelComponent } from './panel/panel/panel.component';
import { CardComponent } from './panel/card/card.component';

const appRoutes: Routes = [
  { path: '', component: PanelComponent },
  { path: 'activated', component:  PanelComponent},
  { path: 'deactivated', component:  PanelComponent},
  { path: 'requests', component:  PanelComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    PanelComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
