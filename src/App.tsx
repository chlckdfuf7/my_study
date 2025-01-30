import React, { useEffect } from 'react';
import './App.css';
import MainPageComponent from './components/MainPageComponent';
import RootStore from './store/RootStore';
import InformationStore from './store/InformationStore';
import StoreProvider from './store/StoreProvider';
import UserStore from './store/UserStore';

let rootStore: RootStore | undefined;

function App() {
  if (!rootStore) {
    const informationStore = new InformationStore();
    const userStore = new UserStore();
    rootStore = {informationStore, userStore} as RootStore;
  }

  // 앱이 처음 시작할 때, 유저 정보 가져오기
  useEffect(() => {
    rootStore?.userStore.fetchUserData("admin");
  }, []);

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
