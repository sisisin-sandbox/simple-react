import * as React from 'react';
import { useServices } from '../../services';
import { createActions, useActions, AnyAction } from '../../common/ActionHelpers';

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

export const Home = () => {
  const { state } = React.useContext(HomeContext);
  const { homeRepository } = useServices();
  const { updateHome } = useActions(HomeContext, HomeActions);

  React.useEffect(() => {
    homeRepository.getMock().then(({ home }) => {
      updateHome(home);
    });
  }, [homeRepository, updateHome]);

  return <div>this is {JSON.stringify(state)}</div>;
};

export const HomeContainer = () => {
  const [state, dispatch] = React.useReducer(homeReducer, { counter: 0, home: null });
  const value = { state, dispatch };

  return (
    <HomeContext.Provider value={value}>
      <Home />
    </HomeContext.Provider>
  );
};
