import { Button } from 'main/components/Button';
import { useServices } from 'main/services';
import * as React from 'react';
import { useHomeState } from '../module';

export const HomeView = () => {
  const state = useHomeState();
  const { homeDomain } = useServices();
  const updateHome = homeDomain.useUpdateHome();

  React.useEffect(() => {
    updateHome();
  }, [updateHome]);

  return (
    <div>
      <div>this is {JSON.stringify(state)}</div>
      <Button />
    </div>
  );
};
