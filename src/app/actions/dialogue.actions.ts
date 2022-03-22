import {createAction, props} from '@ngrx/store';
import {Dialogue, UpdateMovement} from "../components/models/dialogue";

export const GetAll = createAction('[Dialogue] Get');
export const Processed = createAction('[Dialogue] Processed');

// export const NewDialogue = createAction('[Dialogue] New',props<{ payload: Dialogue }>() );
// export const RemoveDialogue = createAction('[Dialogue] Remove',props<{ payload: string }>() );
// export const SetPosition = createAction('[Dialogue] Set Position',props<{ payload: UpdateMovement }>() );
// export const SelectDialogue = createAction('[Dialogue] Select',props<{ payload: string   }>() );
// export const ConnectDialogue = createAction('[Dialogue] Connect',props<{ payload: string   }>() );



// export const decrement = createAction('[Counter Component] Decrement');
// export const reset = createAction('[Counter Component] Reset');
