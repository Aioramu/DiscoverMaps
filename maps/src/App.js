import logo from './logo.svg';
import './App.css';
import * as fs from 'fs'
import { YMaps, Map,GeoObject, Placemark, Polyline, Rectangle, Polygon, Circle, Clusterer, ObjectManager } from 'react-yandex-maps';
import * as coor from "./places";
var coord=new Array(coor)
//coord.push(coor)
//console.log(coor[0],typeof coor,typeof coord,coord[0]['default'][0])
//console.log('sooqa',coord[231]['lon'],coord.length)
console.log(coord[0]['default']['features'][0]['geometry'])
const App = () => (

  <div class="map">
  <div id="entry">
    <center>
    <a href="/usercase/login">Войти </a>
    <a href="/usercase/registration">Зарегестрироваться</a>
    </center>
  </div>
  <YMaps >

  <Map
    defaultState={{
      center: [55.751574, 37.573856],
      zoom: 10,
    }}
    width={1500} height={800}>
    <ObjectManager
      options={{
        clusterize: true,
        gridSize: 32,
      }}
      objects={{
        openBalloonOnClick: true,
        preset: 'islands#greenDotIcon',
      }}
      clusters={{
        preset: 'islands#redClusterIcons',
      }}
      filter={object => object.id % 2 === 0}
      defaultFeatures={coord[0]['default']['features']}
      modules={[
        'objectManager.addon.objectsBalloon',
        'objectManager.addon.objectsHint',
      ]}
    />
  </Map>
</YMaps>
</div>
);
export default App;
