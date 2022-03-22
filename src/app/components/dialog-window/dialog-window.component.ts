import {Component, Input, OnInit} from '@angular/core';
import {Dialogue} from "../models/dialogue";
import {select, Store} from "@ngrx/store";
import {GetAll} from "../../actions/dialogue.actions";
import {Subscription} from "rxjs";
import * as fromStore from "../../reducers";
import {DialogueState} from "../../Globals/DialogueState";
import {Guid} from "guid-typescript";

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.css']
})
export class DialogWindowComponent implements OnInit {
  public selectedRecord :Dialogue;
  public dialogue: Dialogue;
  @Input() dialogue_entry: string;


  selectedDialogueSub : Subscription;


  constructor(private store:Store<any>, private State:DialogueState) {

  }

  ngOnInit(): void {
    this.dialogue = this.State.SelectDialogueAction(this.dialogue_entry);
    this.selectedDialogueSub = this.store.pipe(select(fromStore.Redraw)).subscribe((data) =>{
        this.selectedRecord = this.State.selectedDialogue
    });


  }

  Remove() {
    this.State.RemoveDialogueAction(this.dialogue_entry);
    this.store.dispatch(GetAll())

      //this.store.dispatch(RemoveDialogue({"payload": this.dialogue_entry.UniqueId}))
  }


  Select(){
    this.State.SetDialogue(this.dialogue_entry);
    this.store.dispatch(GetAll())
    //this.store.dispatch(SelectDialogue({"payload": this.dialogue_entry.UniqueId}))
  }

  Connect(){
    this.State.ConnectAction(this.dialogue.UniqueId);
    this.store.dispatch(GetAll())
   // this.store.dispatch(ConnectDialogue({"payload": this.dialogue_entry.UniqueId}))
  }


  RemoveConnection() {
    this.selectedRecord.RemoveConnection(this.dialogue.UniqueId);
    this.store.dispatch(GetAll())
  }

  Deselect() {
    this.State.Deselect()
    this.store.dispatch(GetAll());
  }

  AddNewChild() {
    this.State.SetDialogue(this.dialogue.UniqueId);
    let guid =  Guid.create().toString();
    let d = new Dialogue(guid, this.State.selectedDialogue.Xpos + this.State.DialogueWindowWidth + 150,this.State.selectedDialogue.Ypos, guid)
    this.State.AppendDialogueAction(d);
    this.State.ConnectAction(guid);
    this.store.dispatch(GetAll());
  }
}
