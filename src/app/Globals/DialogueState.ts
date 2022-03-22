import { Injectable } from '@angular/core';
import {Dialogue, UpdateMovement} from "../components/models/dialogue";

@Injectable()
export class DialogueState {
  private dialogues: Dialogue[] = []
  public selectedDialogue: Dialogue


  public GetAll():Dialogue[]{
    return this.dialogues
  }

  public SetPositionDialogueAction(dialogue:UpdateMovement){
    for (let i = 0; i < this.dialogues.length; i++) {
      if(this.dialogues[i].UniqueId == dialogue.UniqueId)
      {
        this.dialogues[i].Xpos = dialogue.Xpos;
        this.dialogues[i].Ypos = dialogue.Ypos;
        break;
      }
    }
  }

  public AppendDialogueAction(dialogue:Dialogue){
    this.dialogues.push(dialogue);

    console.log("Final", this.dialogues)
  }

  public RemoveDialogueAction(uniqueId:string){
    for (let i = 0; i < this.dialogues.length; i++)
    {
      if(this.dialogues[i].UniqueId != uniqueId) {
        this.dialogues[i] = null;
      }
    }
  }

  public SetDialogue(uniqueId:string){

    for (let i = 0; i < this.dialogues.length; i++)
    {
      if(this.dialogues[i].UniqueId == uniqueId) {
        this.selectedDialogue = this.dialogues[i];
      }
    }
  }


  public SelectDialogueAction(uniqueId:string): Dialogue{

    for (let i = 0; i < this.dialogues.length; i++)
    {
      if(this.dialogues[i].UniqueId == uniqueId) {
       return this.dialogues[i];

      }
    }

    return null;
  }

  public ConnectAction(dialogueID:string){
    let connectingRecord = this.SelectDialogueAction(dialogueID);
    for (let i = 0; i < this.dialogues.length; i++)
    {
      if(this.dialogues[i].UniqueId == this.selectedDialogue.UniqueId)
      {
        this.dialogues[i].ChildrenNodes.push(connectingRecord)
      }
    }
  }




}
