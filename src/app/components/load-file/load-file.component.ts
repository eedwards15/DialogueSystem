import {Component, HostListener, OnInit} from '@angular/core';
import {DialogueState} from "../../Globals/DialogueState";
import {Store} from "@ngrx/store";
import {GetAll} from "../../actions/dialogue.actions";

@Component({
  selector: 'app-load-file',
  templateUrl: './load-file.component.html',
  styleUrls: ['./load-file.component.css']
})
export class LoadFileComponent implements OnInit {
  public IsActive:boolean;
  public File:string

  constructor(private State:DialogueState, private store:Store<any>) {
    this.IsActive = false;
    this.File = ""
  }

  ngOnInit(): void {
  }


  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let key = event.key;
    if((event.ctrlKey || event.metaKey) && key == "o"){
      this.IsActive = !this.IsActive;

    }
  }

  Load() {
    this.State.LoadAction(this.File);
    this.store.dispatch(GetAll());
  }
}
