import { useHomeActions } from 'main/modules/home/module';
import React from 'react';

const basePath = (() => {
  switch (process.env.REACT_APP_STAGE) {
    case 'production':
      return '';
    default:
      return 'http://localhost:4444/api/v1';
  }
})();

class HttpClient {
  get<T>(path: string): Promise<T> {
    return fetch(`${basePath}${path}`).then(res => res.json());
  }
}
const httpClient = new HttpClient();
class HomeRepository {
  constructor(private client: HttpClient) {}
  get() {
    return this.client.get<{ home: string }>('/home');
  }
  getMock(): Promise<{ home: string }> {
    return new Promise(done => {
      setTimeout(() => done({ home: 'hoge' }), 200);
    });
  }
}
const homeRepository = new HomeRepository(httpClient);

class HomeDomain {
  useUpdateHome() {
    const { updateHome } = useHomeActions();
    return async () => {
      const { home } = await homeRepository.getMock();
      updateHome(home);
    };
  }
}
const homeDomain = new HomeDomain();

const value = {
  homeRepository,
  homeDomain,
};

const ServiceContext = React.createContext(value);
export const ServiceContextDefaultProvider = (props: { children: any }) => (
  <ServiceContext.Provider value={value}>{props.children}</ServiceContext.Provider>
);
export const useServices = () => {
  return React.useContext(ServiceContext);
};
