import {createAction, props} from '@ngrx/store';
import {Dialogue, UpdateMovement} from "../components/models/dialogue";

export const NewDialogue = createAction('[Dialogue] New',props<{ payload: Dialogue }>() );
export const RemoveDialogue = createAction('[Dialogue] Remove',props<{ payload: string }>() );
export const SetPosition = createAction('[Dialogue] Set Position',props<{ payload: UpdateMovement }>() );


// export const decrement = createAction('[Counter Component] Decrement');
// export const reset = createAction('[Counter Component] Reset');
