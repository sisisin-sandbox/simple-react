import React from 'react';
import { useActions } from 'main/common/ActionHelpers';
import { FugaActions, FugaContext } from '../module';
import { Button } from 'main/components/Button';

export const FugaView = () => {
  const { state } = React.useContext(FugaContext);
  const { updateFoo } = useActions(FugaContext, FugaActions);

  return (<div>
    <div>Module {state.foo} fuga</div>
    <Button onClick={updateFoo} />
  </div>);
};
