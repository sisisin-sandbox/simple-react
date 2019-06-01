import * as React from 'react';
import { AnyAction, createActions } from 'main/common/ActionHelpers';
import { FugaView } from './components/FugaView';

export const FugaContext = React.createContext<{
  state: FugaState;
  dispatch: <T extends AnyAction>(action: T) => void;
}>(null as any);

interface FugaState {
  foo: string;
}

export const FugaActions = createActions('fuga', {
  updateFoo: (foo: string) => ({ foo }),
});

const fugaReducer = (state: FugaState, action: any): FugaState => {
  if (FugaActions.updateFoo.match(action)) {
    return { foo: action.payload.foo };
  } else {
    return state;
  }
};

export const FugaModule = () => {
  const [state, dispatch] = React.useReducer(fugaReducer, { foo: 'bar' });
  const value = { state, dispatch };

  return (
    <FugaContext.Provider value={value}>
      <FugaView />
    </FugaContext.Provider>
  );
};
