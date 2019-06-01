import React from 'react';
import { HomeModule } from './components/home/module';
import { ServiceContextDefaultProvider } from './services';

export const App: React.FC = () => {
  return (
    <ServiceContextDefaultProvider>
      <HomeModule />
    </ServiceContextDefaultProvider>
  );
};
