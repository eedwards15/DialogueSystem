import { Injectable } from '@angular/core';
import {Dialogue, JsonHelper, UpdateMovement} from "../components/models/dialogue";

@Injectable()
export class DialogueState {
  public dialogues: Dialogue[] = []
  public selectedDialogue: Dialogue

  public DialogueWindowWidth = 400;
  public DialogueWindowHeight = 219;


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
  }

  public RemoveDialogueAction(uniqueId:string)
  {
    for (let i = 0; i < this.dialogues.length; i++) {
      let record = this.dialogues[i];
      record.RemoveConnection(uniqueId);
    }

    let index =  this.dialogues.findIndex(x => x.UniqueId == uniqueId);
    if (index > -1) {
      this.dialogues.splice(index, 1);
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
    if(this.selectedDialogue.HasConnection(dialogueID))
    {
      console.log("Has Connect", this.selectedDialogue);
      return;
    }


    for (let i = 0; i < this.dialogues.length; i++)
    {
      if(this.dialogues[i].UniqueId === this.selectedDialogue.UniqueId)
      {
        this.dialogues[i].ChildrenNodes.push(dialogueID)
      }
    }
  }

  public Update(dialogue: Dialogue) {

    for (let i = 0; i < this.dialogues.length; i++)
    {
      if(this.dialogues[i].UniqueId == dialogue.UniqueId) {
        console.log("Inside State");
        this.dialogues[i].Value = dialogue.Value;
        console.log("After Update", dialogue.Value);
      }
    }
  }

  public Deselect(){
    this.selectedDialogue = null;
  }

  public LoadAction(jsonfile:string){
    let objFromJSon = JSON.parse(jsonfile);
    console.log("j", objFromJSon);
    let results:Dialogue[] = [];

    for (let i = 0; i <  objFromJSon.length ; i++)
    {
      let record = JsonHelper.JsonToDialogue(objFromJSon[i]);

      for (let j = 0; j <  objFromJSon[i].ChildrenNodes.length ; j++)
      {
        record.ChildrenNodes.push(objFromJSon[i].ChildrenNodes[j])
      }
      results.push(record);
    }

    this.dialogues = results;
    console.log("D", this.dialogues);
  }


}
