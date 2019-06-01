import * as React from 'react';
import { AnyAction, createActions } from 'main/common/ActionHelpers';
import { {{pascalCase name}}View } from './components/{{pascalCase name}}View';

export const {{pascalCase name}}Context = React.createContext<{
  state: {{pascalCase name}}State;
  dispatch: <T extends AnyAction>(action: T) => void;
}>(null as any);

interface {{pascalCase name}}State {
  foo: string;
}

export const {{pascalCase name}}Actions = createActions('{{camelCase name}}', {
  updateFoo: (foo: string) => ({ foo }),
});

const {{camelCase name}}Reducer = (state: {{pascalCase name}}State, action: any): {{pascalCase name}}State => {
  if ({{pascalCase name}}Actions.updateFoo.match(action)) {
    return { foo: action.payload.foo };
  } else {
    return state;
  }
};

export const {{pascalCase name}}Module = () => {
  const [state, dispatch] = React.useReducer({{camelCase name}}Reducer, { foo: 'bar' });
  const value = { state, dispatch };

  return (
    <{{pascalCase name}}Context.Provider value={value}>
      <{{pascalCase name}}View />
    </{{pascalCase name}}Context.Provider>
  );
};
