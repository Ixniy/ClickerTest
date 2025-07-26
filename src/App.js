import './App.css';
import { useEffect } from 'react';
import { useTelegram } from './hooks/useTelegram';
import {Route, Routes} from 'react-router-dom';
import Profile from './pages/Profile/Profile';
import Clicker from './pages/Clicker/Clicker';


function App() {
  const {tg} = useTelegram();

  useEffect( () => {
    tg.ready();

  })


  return (
    <div className="App">
      <Routes>
        <Route path={'profile'} element={<Profile/>} />
        <Route index element={<Clicker />}></Route>
      </Routes>
    </div>
  );
}

export default App;
