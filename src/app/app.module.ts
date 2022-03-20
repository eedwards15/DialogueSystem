import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import {routing} from "./app.routing";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { CharacterListComponent } from './components/character-list/character-list.component';
import {DialogueWindow} from "./components/Directives/DialogueWindow";
import {CommonModule} from "@angular/common";
import {DraggableSelector} from "./components/Directives/DraggableSelector";
import { DialogWindowComponent } from './components/dialog-window/dialog-window.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CharacterListComponent,
    DialogueWindow,
    DraggableSelector,
    DialogWindowComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    CommonModule,
    HttpClientModule,
    FormsModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
