import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';
import { PageHeaderComponent } from './page-header/page-header/page-header.component';
import { PanelComponent } from './panel/panel/panel.component';
import { CardComponent } from './panel/card/card.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    PageHeaderComponent,
    PanelComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
