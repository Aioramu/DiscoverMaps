import logo from './logo.svg';
import './App.css';
import * as fs from 'fs'
import { YMaps, Map,GeoObject, Placemark, Polyline, Rectangle, Polygon, Circle, Clusterer, ObjectManager } from 'react-yandex-maps';
import * as coor from "./places";
import  React, { Component } from  'react';
import  CustomersService  from  './ClientUp';
import Item from './Items';
const axios = require('axios').default;
const  customersService  =  new  CustomersService();

const API_URL = 'http://localhost:8000';
class  CustomersList  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        customers: [],
        nextPageURL:  ''
    };
    this.nextPage  =  this.nextPage.bind(this);
    this.handleDelete  =  this.handleDelete.bind(this);
}

componentDidMount() {
    var  self  =  this;
    customersService.getCustomers().then(function (result) {
        console.log(result);
        self.setState({ customers:  result.data, nextPageURL:  result.nextlink})
    });
}
handleDelete(e,pk){
    var  self  =  this;
    customersService.deleteCustomer({pk :  pk}).then(()=>{
        var  newArr  =  self.state.customers.filter(function(obj) {
            return  obj.pk  !==  pk;
        });

        self.setState({customers:  newArr})
    });
}

nextPage(){
    var  self  =  this;
    console.log(this.state.nextPageURL);
    customersService.getCustomersByURL(this.state.nextPageURL).then((result) => {
        self.setState({ customers:  result.data, nextPageURL:  result.nextlink})
    });
}
};
var fae=''
//console.log(coord[0]['default']['features'][50])
//console.log(coord[0]['default']['features'][51])
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      value: '/usercase/api/item'
    };
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {    this.setState({value: event.target.value});
  fae=event.target.value}
  handleSubmit(event) {
    console.log(fae)
    fetch(this.state.value)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result.data)
          this.setState({
            isLoaded: true,
            items: result.data
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
    console.log(this.state)
  event.preventDefault();
  //this.componentDidMount()
}
  componentDidMount() {
    console.log(fae)
    fetch(this.state.value)
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result.data)
          this.setState({
            isLoaded: true,
            items: result.data
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

  var coord=items
  if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      console.log(coord['features'])
  return(

  <div class="map">

  <div id="entry">
  <form onSubmit={this.handleSubmit}>
        <label>
          Выберите событие:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="/usercase/api/item">Все</option>
            <option value="/usercase/api/events">События</option>
            <option value="/usercase/api/performance">Спектакли</option>
          </select>
        </label>
        <input type="submit" value="Отправить" />
      </form>
    <center>
    <a href="http://127.0.0.1:8000/usercase/login/">Войти </a>
    <a href="http://127.0.0.1:8000/usercase/registration">Зарегестрироваться</a>
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

      //defaultFeatures={this.state.items}

      defaultFeatures={coord['features']}
      modules={[
        'objectManager.addon.clustersBalloon',
        'objectManager.addon.clustersHint',
        'objectManager.addon.objectsBalloon',
        'objectManager.addon.objectsHint',
      ]}
    />
  </Map>
</YMaps>
</div>
);
}
}
}
export default App;
