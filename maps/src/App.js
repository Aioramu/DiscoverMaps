import logo from './logo.svg';
import './App.css';
import * as fs from 'fs'
import { YMaps, Map,GeoObject, Placemark, Polyline, Rectangle, Polygon, Circle, Clusterer, ObjectManager } from 'react-yandex-maps';
import * as coor from "./coords";
var coord=new Array(coor)
//coord.push(coor)
//console.log(coor[0],typeof coor,typeof coord,coord[0]['default'][0])
//console.log('sooqa',coord[231]['lon'],coord.length)
var points=[]
console.log(points)
for (var i=0;i<coord[0]['default'].length;i++){
    points.push([coord[0]['default'][i]['lat'],coord[0]['default'][i]['lon']])
    console.log(points)
    //points[i].push(coord[0]['default'][i]['lat'])
    //points[i].push(coord[0]['default'][i]['lon'])
  };
//var points=[[55.751574, 37.573856],[55.758574, 37.573856],[55.765574, 37.573856]]
console.log(points[0][0])
const App = () => (

  <YMaps>
  <a href="/usercase/login/">Войти</a>
    <div>
    <Map
  defaultState={{
    center: [55.751574, 37.573856],
    zoom: 5,
  }}>
  <Clusterer
    options={{
      preset: 'islands#invertedVioletClusterIcons',
      groupByCoordinates: false,
    }}>
    {points.map((coordinates, index) => (
      <Placemark key={index} geometry={coordinates} />
    ))}
  </Clusterer>
  </Map>
    </div>
  </YMaps>
);

export default App;
