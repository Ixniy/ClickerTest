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
  try {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Или другой прокси
    const targetUrl = 'https://humble-carnival.../api/users/';
    
    const response = await fetch(proxyUrl + targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://helpful-jalebi-0e83df.netlify.app' // Укажите ваш домен
      },
      body: JSON.stringify({
        id: 'user@example.com',
        username: 'admin',
        password: '123456'
      })
    });

    const data = await response.json();
    tg.showAlert(JSON.stringify(data));
  } catch (error) {
    console.error('Ошибка:', error);
  }
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
