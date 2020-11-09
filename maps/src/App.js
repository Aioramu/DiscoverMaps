import logo from './logo.svg';
import './App.css';
import { YMaps, Map } from 'react-yandex-maps';
const App = () => (

  <YMaps>
  <a href="/usercase/login/">Войти</a>
    <div>
      <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
    </div>
  </YMaps>
);

export default App;
