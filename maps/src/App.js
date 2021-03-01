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

const API_URL = 'http://localhost:9 000';
var fae=''
//console.log(coord[0]['default']['features'][50])
//console.log(coord[0]['default']['features'][51])
class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email:'',
      pas:''
    };
    //this.handleClick = this.handleClick.bind(this);
    this.register = this.register.bind(this);
    this.nameChange = this.nameChange.bind(this);

    this.emailChange = this.emailChange.bind(this);
    this.pasChange = this.pasChange.bind(this);
}
nameChange(event) {    this.setState({name: event.target.value});  }
 emailChange(event) {    this.setState({email: event.target.value});  }
  pasChange(event) {    this.setState({pas: event.target.value});  }
  register(event){
    axios.post('/usercase/api/reg/',{
"username":this.state.name,
"password":this.state.email,
"email":this.state.pas
}).then(res => {
         alert("hello",res.data)
  })}

   render() {
     console.log("Cho blyat")
    return(<div><form onSubmit={this.register}>
       Никнейм:<input type="text" value={this.state.name} onChange={this.nameChange} />
       Почта:<input type="email" value={this.state.email} onChange={this.emailChange} />
       Пароль:<input type="password" value={this.state.pas} onChange={this.pasChange} />
       <input type="submit" value="Отправить" />
       </form></div>);  }
}
class Events extends Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }
  componentDidMount() {
    axios.get("/usercase/api/events/").then(res => {
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
    var coord=items.data
    console.log(coord)
    return( <YMaps >
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
}
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
    axios.post("/usercase/api/reccomended/",{
    "userid":1
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
    var coord=items.data
    console.log(coord)
    return( <YMaps >
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
}
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      value:'/usercase/api/item/',
      items: [],
      showPopup: false,
      showEvents:false,
      showAll:true,
      showRecs:false,
    };

  }
  sendlike(event){
    console.log("231",event.target.value)
    event.preventDefault()
    let payload =  {"userid":1,
    "event_id":Number(event.target.value)}

    let res = axios.post('/usercase/api/like/', payload);

    //let data = res.data;
   //console.log(data);

  }
  componentDidMount() {
    axios.get(this.state.value,).then(res => {
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
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  toggleEvents() {
    this.setState({
      showAll:false,
      showEvents: true,
      showRecs:false,
    });
  }
  toggleRecs() {
    this.setState({
      showAll:false,
      showEvents: false,
      showRecs:true,
    });
  }

render() {
  const { error, isLoaded, items } = this.state;

  var coord=items.data
  if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
  return(

  <div class="map">

  <div id="entry">

    <center>
    <a href="#" onClick={this.togglePopup.bind(this)}>Войти</a>

    <a href="#" onClick={"Извините,пока недоступно :("}> Зарегестрироваться</a>
    {this.state.showPopup ?
  <Popup
    text='Close Me'
    closePopup={this.togglePopup.bind(this)}
  />
  : null
}
    <a href="#" onClick={this.toggleEvents.bind(this)}> Мероприятия</a>
    <a href="#" onClick={this.toggleRecs.bind(this)}> Специально для вас</a>
    </center>
  </div>
  {this.state.showEvents ?
  <Events/> :null
}
{this.state.showRecs ?
<Recom/> :null
}
  {this.state.showAll ?<YMaps >
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
:null }
</div>
);
}
}
}
export default App;
