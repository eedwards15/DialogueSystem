import {Component, ComponentFactoryResolver, HostListener, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {DialogueWindow} from "../Directives/DialogueWindow";
import {DialogWindowComponent} from "../dialog-window/dialog-window.component";
import {Dialogue} from "../models/dialogue";
import { Guid } from "guid-typescript";
import {select, Store} from "@ngrx/store";
import {Subscription} from "rxjs";
import * as fromStore from '../../reducers/';
import {NewDialogue} from "../../actions/dialogue.actions";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  public IsActive:boolean
  public dialogues:Dialogue[];

  public dialoguesSub: Subscription;


  constructor(private store:Store<any>) {
    this.IsActive = false
    this.dialogues = []

  }

  ngOnInit(): void {
    this.IsActive = false
    this.dialoguesSub = this.store.pipe(select(fromStore.AllDialogues)).subscribe((data) =>{
      if(data != null){
        this.dialogues = data;
        console.log("Data",data)
      }
    });

  }


  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let key = event.key;

    if(key == "c")
    {
      this.IsActive = !this.IsActive
    }

    if(key == "n")
    {
      let guid =  Guid.create().toString();
      let d = new Dialogue(guid,0,0, guid)
      this.store.dispatch(NewDialogue({"payload":d }))
    }

  }




}
