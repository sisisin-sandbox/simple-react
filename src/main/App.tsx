import React from 'react';
import { HomeModule } from './modules/home/module';
import { ServiceContextDefaultProvider } from './services';
import { FugaModule } from './modules/fuga/module';

export const App: React.FC = () => {
  return (
    <ServiceContextDefaultProvider>
      <HomeModule />
      <FugaModule />
    </ServiceContextDefaultProvider>
  );
};
