import * as React from 'react';
import { useActions } from 'main/common/ActionHelpers';
import { useServices } from 'main/services';
import { HomeActions, HomeContext } from './module';

export const Home = () => {
  const { state } = React.useContext(HomeContext);
  const { homeRepository } = useServices();
  const { updateHome } = useActions(HomeContext, HomeActions);

  React.useEffect(() => {
    homeRepository.getMock().then(({ home }) => {
      updateHome(home);
    });
  }, [homeRepository, updateHome]);

  return <div>this is {JSON.stringify(state)}</div>;
};
