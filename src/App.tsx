import React, { useEffect } from 'react';
import './App.css';
import MainPageComponent from './components/MainPageComponent';
import RootStore from './store/RootStore';
import InformationStore from './store/InformationStore';
import StoreProvider from './store/StoreProvider';

let rootStore: RootStore | undefined;

function App() {
  if (!rootStore) {
    const informationStore = new InformationStore();
    rootStore = {informationStore} as RootStore;
  }

  // useEffect(() => {
  //   return () => {
  //     rootStore = undefined;
  //   };
  // }, []);

  return (
    <StoreProvider value={rootStore}>
      <div className="App">
        <MainPageComponent />
      </div>
    </StoreProvider>
  );
}

export default App;
