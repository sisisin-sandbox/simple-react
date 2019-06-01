import React from 'react';
import { Button } from 'main/components/Button';
import { use{{pascalCase name}}State, use{{pascalCase name}}Actions } from '../module';

export const {{pascalCase name}}View = () => {
  const state = use{{pascalCase name}}State();
  const { updateFoo } = use{{pascalCase name}}Actions();
  return (
    <div>
      <div>Module {state.foo} {{camelCase name}}</div>
      <Button onClick={() => updateFoo('foooo')} />
    </div>
  );
};
