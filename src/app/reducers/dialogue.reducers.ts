import { createReducer, on } from '@ngrx/store';
import {Dialogue, UpdateMovement} from "../components/models/dialogue";
import {

  GetAll,
 Processed,

} from "../actions/dialogue.actions";

export interface State {
  dialogues: Dialogue[]
  selectedDialogue: Dialogue
  redraw: boolean
}

// @ts-ignore
export const initialState: State = {
  dialogues: [],
  selectedDialogue: null,
  redraw: false
};

const _dialogueReducer = createReducer(initialState,
  on(GetAll, (state,payload) =>   {
    return {...state, redraw:true};
  }),
  on(Processed, (state,payload) =>   {
    return {...state, redraw:false};
  }),





);

function SetPositionDialogueAction(state:any, dialogue:UpdateMovement):Dialogue[]{

  for (let i = 0; i < state.dialogues.length; i++) {
    if(state.dialogues[i].UniqueId == dialogue.UniqueId)
    {
      state.dialogues[i].Xpos = dialogue.Xpos;
      state.dialogues[i].Ypos = dialogue.Ypos;
      break;
    }
  }

  return state.dialogues
}

function AppendDialogueAction(state:any, dialogue:Dialogue):Dialogue[]{
  state.dialogues.push(dialogue);
  return state.dialogues;
}

function RemoveDialogueAction(state:any, uniqueId:string):Dialogue[]{
  let temp:Dialogue[] =  [];
  for (let i = 0; i < state.dialogues.length; i++)
  {
    if(state.dialogues[i].UniqueId != uniqueId) {
      temp.push(state.dialogues[i])
    }
  }
  return temp;
}

function SelectDialogueAction(state:any, uniqueId:string):Dialogue{

  for (let i = 0; i < state.dialogues.length; i++)
  {
    if(state.dialogues[i].UniqueId == uniqueId) {
       return state.dialogues[i];
    }
  }
  return null;
}

function ConnectAction(state:any, dialogueID:string):Dialogue[]{
  let connectingRecord = SelectDialogueAction(state,dialogueID);
  for (let i = 0; i < state.dialogues.length; i++)
  {
    if(state.dialogues[i].UniqueId == state.selectedDialogue.UniqueId)
    {
       state.dialogues[i].ChildrenNodes.push(connectingRecord)
    }
  }
  return state.dialogues;
}




export function reducer(state:any, action:any) {
  return _dialogueReducer(state, action);
}

export const AllDialogue = (state: State) => state.dialogues;
export const SelectedDialogue = (state:State) => state.selectedDialogue;
export const Redraw = (state:State) => state.redraw;
