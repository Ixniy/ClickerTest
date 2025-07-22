import './App.css';
import React, { useEffect } from 'react';
import ClickerGame from './components/ClickerGame/ClickerGame';
import { useTelegram } from './components/hooks/useTelegram';
import Header from './components/Header/Header';
import {Route, Routes} from 'react-router-dom';
import TasksList from './components/TasksList/TasksList';
import UserProfile from './components/UserProfile/UserProfile';

function App() {
  const {tg} = useTelegram();

  useEffect( () => {
    tg.ready();

  })



  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ClickerGame />}/>
        <Route path={'tasks'} element={<TasksList/>} />
        <Route path={'profile'} element={<UserProfile/>} />
      </Routes>
      <ClickerGame />
    </div>
  );
}

export default App;
