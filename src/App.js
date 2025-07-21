import './App.css';
import React, { useEffect } from 'react';
import ClickerGame from './components/ClickerGame';
import { useTelegram } from './components/hooks/useTelegram';
import Header from './components/Header/Header';


function App() {
  const {onToggleButton, tg} = useTelegram();

  useEffect( () => {
    tg.ready();
  })

  return (
    <div className="App">
      <Header />
      <ClickerGame />
      <button onClick={onToggleButton}>toggleg</button>
    </div>
  );
}

export default App;
