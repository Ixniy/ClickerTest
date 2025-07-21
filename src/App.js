import './App.css';
import React, { useEffect } from 'react';
import ClickerGame from './components/ClickerGame';
import { useTelegram } from './components/hooks/useTelegram';
import Header from './components/Header/Header';


function App() {
  const {tg} = useTelegram();

  useEffect( () => {
    tg.ready();

  })


  async function getApi() {
    const response = await fetch('https://humble-carnival-r9rwqpp99r9cw7vj-80.app.github.dev/api/users/',);
    const data = response.json();
    alert(data);
  }


  return (
    <div className="App">
      <Header />
      <ClickerGame />
      <button onClick={getApi}>toggleg</button>

    </div>
  );
}

export default App;
