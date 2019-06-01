import * as React from 'react';
import { AnyAction, createActions } from 'main/common/ActionHelpers';
import { Home } from './Home';

export const HomeContext = React.createContext<{
  state: HomeState;
  dispatch: <T extends AnyAction>(action: T) => void;
}>(null as any);

interface HomeState {
  counter: number;
  home: string | null;
}

export const HomeActions = createActions('home', {
  increment: null,
  updateHome: (home: string) => ({ home }),
});

const homeReducer = (state: HomeState, action: any): HomeState => {
  if (HomeActions.updateHome.match(action)) {
    return { ...state, home: action.payload.home };
  } else if (HomeActions.increment.match(action)) {
    return { ...state, counter: state.counter + 1 };
  } else {
    return state;
  }
};

export const HomeModule = () => {
  const [state, dispatch] = React.useReducer(homeReducer, { counter: 0, home: null });
  const value = { state, dispatch };

  return (
    <HomeContext.Provider value={value}>
      <Home />
    </HomeContext.Provider>
  );
};
