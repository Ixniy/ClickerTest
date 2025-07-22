import './App.css';
import React, { useEffect } from 'react';
import ClickerGame from './components/ClickerGame/ClickerGame';
import { useTelegram } from './components/hooks/useTelegram';
import Header from './components/Header/Header';

function App() {
  const {tg} = useTelegram();

  useEffect( () => {
    tg.ready();

  })



  return (
    <div className="App">
      <Header />
      <ClickerGame />
    </div>
  );
}

export default App;
