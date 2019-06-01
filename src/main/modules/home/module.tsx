import { createModule } from 'main/common/createModule';
import React from 'react';
import { HomeView } from './components/HomeView';

interface HomeState {
  counter: number;
  home: string | null;
}

const { Context: HomeContext, Actions, createUseState, useActions } = createModule('home', {
  increment: null,
  updateHome: (home: string) => ({ home }),
});

export const useHomeState = createUseState<HomeState>();
export const useHomeActions = useActions;

const homeReducer = (state: HomeState, action: any): HomeState => {
  if (Actions.updateHome.match(action)) {
    return { ...state, home: action.payload.home };
  } else if (Actions.increment.match(action)) {
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
      <HomeView />
    </HomeContext.Provider>
  );
};
