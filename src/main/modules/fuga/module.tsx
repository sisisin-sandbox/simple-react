import React from 'react';
import { createModule } from 'main/common/createModule';
import { FugaView } from './components/FugaView';

interface FugaState {
  foo: string;
}
const { Context: FugaContext, Actions, createUseState, useActions } = createModule('fuga', {
  updateFoo: (foo: string) => ({ foo }),
});
export const useFugaState = createUseState<FugaState>();
export const useFugaActions = useActions;

const fugaReducer = (state: FugaState, action: any): FugaState => {
  if (Actions.updateFoo.match(action)) {
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
