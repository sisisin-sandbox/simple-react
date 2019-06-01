import { Button } from 'main/components/Button';
import { useServices } from 'main/services';
import * as React from 'react';
import { HomeContext } from '../module';

export const HomeView = () => {
  const { state } = React.useContext(HomeContext);
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
