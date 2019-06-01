import React from 'react';
import { useActions } from 'main/common/ActionHelpers';
import { {{pascalCase name}}Actions, {{pascalCase name}}Context } from '../module';
import { Button } from 'main/components/Button';

export const {{pascalCase name}}View = () => {
  const { state } = React.useContext({{pascalCase name}}Context);
  const { updateFoo } = useActions({{pascalCase name}}Context, {{pascalCase name}}Actions);

  return (<div>
    <div>Module {state.foo} {{name}}</div>
    <Button onClick={updateFoo} />
  </div>);
};
