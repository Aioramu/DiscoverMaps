import logo from './logo.svg';
import './App.css';
import * as fs from 'fs'
import { YMaps, Map,GeoObject, Placemark, Polyline, Rectangle, Polygon, Circle, Clusterer, ObjectManager } from 'react-yandex-maps';
import * as coor from "./places";
import  React, { Component } from  'react';
const axios = require('axios').default;
const API_URL = 'http://localhost:9000';

class Recom extends Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }
  componentDidMount() {
    console.log(localStorage.getItem("token"))
    axios({
  method: 'get',
  url: API_URL+"/usercase/api/reccomended/",
  responseType: 'stream',
  headers:{"Authorization":'Token '+localStorage.getItem("token")
  }
}).then(res => {
      this.setState({
        isLoaded: true,
        items: res.data
      });
    },

    // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
    // чтобы не перехватывать исключения из ошибок в самих компонентах.
    (error) => {
      //console.log(this.state.items);
      this.setState({
        isLoaded: true,
        error
      });
    }
  )
}
  render() {
    const { error, isLoaded, items } = this.state;
    //console.log(this.state.items,this.state.items.data)
    console.log(items)
    var coord=items
    console.log("rec coord",coord)
    //console.log(localStorage.getItem("token"))
    if (localStorage.getItem("token") !='') {
      return( <YMaps >
    <Map
      defaultState={{
        center: [55.751605, 37.621508],
        zoom: 13,
      }}
      //bigMap =! bigMap
      width={"100%"} height={750}
      >
      <ObjectManager
        options={{
          clusterDisableClickZoom: true,
          clusterize: true,
          gridSize: 32,

        }}
        objects={{
          clusterDisableClickZoom: true,
          openBalloonOnClick: true,
          preset: 'islands#greenDotIcon',
        }}
        clusters={{
          clusterDisableClickZoom: true,
          preset: 'islands#redClusterIcons',
        }}
        filter={object => object.id % 2 === 0}

        //defaultFeatures={this.state.items['features']}

        defaultFeatures={coord}
        modules={[
          'objectManager.addon.clustersBalloon',
          'objectManager.addon.clustersHint',
          'objectManager.addon.objectsBalloon',
          'objectManager.addon.objectsHint',
        ]}
      />
    </Map>
  </YMaps>);
}
else{
  return (<center><p> Извините,но вам надо авторизоваться,чтобы посмотреть рекомендации</p></center>)
}
}
}

export default Recom;
