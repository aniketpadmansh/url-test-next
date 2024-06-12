export interface State {
    play: boolean;
  }
  
  export interface Action {
    type: string;
    payload?: any;
  }
  
  const initialState: State = {
    play: false,
  };
  
  export function reducer(state: State = initialState, action: Action): State {
    switch (action.type) {
      case 'PLAY':
        return { ...state, play: true };
        case 'RESET':
        return { ...state, play: false };
      default:
        return state;
    }
  }
  
  export { initialState };