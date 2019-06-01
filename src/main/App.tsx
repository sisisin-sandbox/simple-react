import React from 'react';
import { HomeModule } from './modules/home/module';
import { ServiceContextDefaultProvider } from './services';

export const App: React.FC = () => {
  return (
    <ServiceContextDefaultProvider>
      <HomeModule />
    </ServiceContextDefaultProvider>
  );
};
