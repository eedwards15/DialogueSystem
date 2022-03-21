import { createReducer, on } from '@ngrx/store';
import {Dialogue, UpdateMovement} from "../components/models/dialogue";
import {NewDialogue, RemoveDialogue, SetPosition} from "../actions/dialogue.actions";

export interface State {
  dialogues: Dialogue[]
}

export const initialState: State = {
  dialogues: []
};

const _dialogueReducer = createReducer(initialState,
  on(NewDialogue, (state,payload) =>   {
    return {...state,
      dialogues:AppendDialogueAction(state, payload.payload)
    };
  }),
  on(SetPosition, (state,payload) =>   {
    return {...state,
      dialogues:SetPositionDialogueAction(state, payload.payload)
    };
  }),
  on(RemoveDialogue, (state,payload) =>   {
    return {...state,
      dialogues:RemoveDialogueAction(state, payload.payload)
    };
  })
);

function SetPositionDialogueAction(state:any, dialogue:UpdateMovement):Dialogue[]{
  let temp:Dialogue[] =  [];
  for (let i = 0; i < state.dialogues.length; i++) {
    if(state.dialogues[i].UniqueId == dialogue.UniqueId){

      let r = JSON.parse(JSON.stringify(state.dialogues[i]))
      r.Xpos = dialogue.Xpos
      r.Ypos = dialogue.Ypos

      console.log("Update",r);
      temp.push(r)
      continue;
    }

    temp.push(state.dialogues[i])
  }
  console.log("Dialogues", temp)
  return temp;
}


function AppendDialogueAction(state:any, dialogue:Dialogue):Dialogue[]{
  let temp:Dialogue[] =  [];
  temp.push(dialogue)
  for (let i = 0; i < state.dialogues.length; i++) {
    temp.push(state.dialogues[i])
  }
  return temp;
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



export function reducer(state:any, action:any) {
  return _dialogueReducer(state, action);
}

export const AllDialogue = (state: State) => state.dialogues;
