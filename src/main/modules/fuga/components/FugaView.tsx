import React from 'react';
import { Button } from 'main/components/Button';
import { useFugaState, useFugaActions } from '../module';

export const FugaView = () => {
  const state = useFugaState();
  const { updateFoo } = useFugaActions();
  return (
    <div>
      <div>Module {state.foo} fuga</div>
      <Button onClick={() => updateFoo('foooo')} />
    </div>
  );
};
