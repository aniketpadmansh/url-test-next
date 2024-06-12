import { createContext, Dispatch } from 'react';
import { State, Action, initialState } from './reducer';

interface ContextProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const StoreContext = createContext<ContextProps>({
  state: initialState,
  dispatch: () => null,
});

export { StoreContext };