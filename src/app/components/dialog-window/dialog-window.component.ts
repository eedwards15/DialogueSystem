import {Component, Input, OnInit} from '@angular/core';
import {Dialogue} from "../models/dialogue";
import {select, Store} from "@ngrx/store";
import {GetAll} from "../../actions/dialogue.actions";
import {Subscription} from "rxjs";
import * as fromStore from "../../reducers";
import {DialogueState} from "../../Globals/DialogueState";

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.css']
})
export class DialogWindowComponent implements OnInit {
  public selectedRecord :Dialogue;
  @Input() dialogue_entry: Dialogue;

  selectedDialogueSub : Subscription;


  constructor(private store:Store<any>, private State:DialogueState) { }

  ngOnInit(): void {

    this.selectedDialogueSub = this.store.pipe(select(fromStore.Redraw)).subscribe((data) =>{
        this.selectedRecord = this.State.selectedDialogue
    });


  }

  Remove() {
    this.State.RemoveDialogueAction(this.dialogue_entry.UniqueId);
    this.store.dispatch(GetAll())

      //this.store.dispatch(RemoveDialogue({"payload": this.dialogue_entry.UniqueId}))
  }


  Select(){
    this.State.SetDialogue(this.dialogue_entry.UniqueId);
    this.store.dispatch(GetAll())
    //this.store.dispatch(SelectDialogue({"payload": this.dialogue_entry.UniqueId}))
  }

  Connect(){
    this.State.ConnectAction(this.dialogue_entry.UniqueId);
    this.store.dispatch(GetAll())
   // this.store.dispatch(ConnectDialogue({"payload": this.dialogue_entry.UniqueId}))
  }

}
