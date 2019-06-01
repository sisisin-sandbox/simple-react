import React from 'react';
import { createModule } from 'main/common/createModule';
import { {{pascalCase name}}View } from './components/{{pascalCase name}}View';

interface {{pascalCase name}}State {
  foo: string;
}
const { Context: {{pascalCase name}}Context, Actions, createUseState, useActions } = createModule('{{camelCase name}}', {
  updateFoo: (foo: string) => ({ foo }),
});
export const use{{pascalCase name}}State = createUseState<{{pascalCase name}}State>();
export const use{{pascalCase name}}Actions = useActions;

const {{camelCase name}}Reducer = (state: {{pascalCase name}}State, action: any): {{pascalCase name}}State => {
  if (Actions.updateFoo.match(action)) {
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
