import {createAction, props} from '@ngrx/store';
import {Dialogue} from "../components/models/dialogue";

export const NewDialogue = createAction('[Dialogue] New',props<{ payload: Dialogue }>() );

// export const decrement = createAction('[Counter Component] Decrement');
// export const reset = createAction('[Counter Component] Reset');
