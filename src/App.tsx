import React from 'react';
import { HomeContainer } from './components/home/Home';
import { ServiceContextDefaultProvider } from './services';

export const App: React.FC = () => {
  return (
    <ServiceContextDefaultProvider>
      <HomeContainer />
    </ServiceContextDefaultProvider>
  );
};
