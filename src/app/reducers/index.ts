import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromCounter from './counter.reducers'
import * as fromDialogue from './dialogue.reducers'

export interface State {
  counter: fromCounter.State,
  dialogue: fromDialogue.State
}

export const reducers: ActionReducerMap<State> = {
  counter: fromCounter.counterReducer,
  dialogue: fromDialogue.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const couterState = createFeatureSelector<fromCounter.State>("counter");
export const total = createSelector(couterState, fromCounter.totalCount);


export const dialogueState = createFeatureSelector<fromDialogue.State>("dialogue");
export const AllDialogues = createSelector(dialogueState,fromDialogue.AllDialogue)
export const SelectedDialogue = createSelector(dialogueState, fromDialogue.SelectedDialogue);
export const Redraw = createSelector(dialogueState, fromDialogue.Redraw);
