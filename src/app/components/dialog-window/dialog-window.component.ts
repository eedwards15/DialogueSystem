import {Component, Input, OnInit} from '@angular/core';
import {Dialogue} from "../models/dialogue";
import {Store} from "@ngrx/store";
import {RemoveDialogue} from "../../actions/dialogue.actions";

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.css']
})
export class DialogWindowComponent implements OnInit {
  @Input() dialogue_entry: Dialogue;

  constructor(private store:Store<any>) { }

  ngOnInit(): void {
  }

  Remove() {
    this.store.dispatch(RemoveDialogue({"payload": this.dialogue_entry.UniqueId}))
  }
}
