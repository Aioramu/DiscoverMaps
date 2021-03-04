import logo from './logo.svg';
import './App.css';
import * as fs from 'fs'
import { YMaps, Map,GeoObject, Placemark, Polyline, Rectangle, Polygon, Circle, Clusterer, ObjectManager } from 'react-yandex-maps';
import * as coor from "./places";
import  React, { Component } from  'react';
import  CustomersService  from  './ClientUp';

const axios = require('axios').default;
const  customersService  =  new  CustomersService();

const API_URL = 'http://localhost:9000';
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
    axios.post(API_URL+'/usercase/api/reg/',{
"username":this.state.name,
"password":this.state.pas,
"email":this.state.email
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
    axios.get(API_URL+"/usercase/api/events/").then(res => {
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
      center: [55.751605, 37.621508],
      zoom: 12,
    }}
    width={"100%"} height={800}>
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
    var coord=items.data
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
class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      value:API_URL+'/usercase/api/item/',
      items: [],
      showPopup: false,
      showEvents:false,
      showAll:true,
      showRecs:false,
      token:'',
      login:'',
      password:'',
    };
    this.login = this.login.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.pasChange = this.pasChange.bind(this);
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
      showPopup: !this.state.showPopup,
      showLogin:false,
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
  login(event) {
  var data={"username":this.state.login,"password":this.state.password}
  axios.post(API_URL+'/usercase/auth/token/login/',data).then(res => {

      localStorage.setItem("token",res.data.auth_token)
        this.setState({
          isLoaded: true,
          token: res.data.auth_token
        });
      },
      //window.location.reload(),
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
    //event.preventDefault()
  }
  logout(){
    axios({
  method: 'post',
  url: API_URL+"/usercase/auth/token/logout/",
  responseType: 'stream',
  headers:{"Authorization":'Token '+localStorage.getItem("token")
  }
});

localStorage.setItem("token",'')
window.location.reload()

}
  toggleAuth() {
    this.setState({
      showLogin:!this.state.showLogin,
      showPopup:false,
    });
  }
  toggleAll() {
    this.setState({
      showAll:true,
      showEvents: false,
      showRecs:false,
    });
  }
  nameChange(event) {    this.setState({login: event.target.value});  }
  pasChange(event) {    this.setState({password: event.target.value});  }
render() {
  const { error, isLoaded, items } = this.state;
  console.log(this.state.value)
  console.log(this.state.items)
  var coord=items.data
  if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
  return(

  <div class="map">
  <div id="entry">

    <center>
    <a href="#" onClick={this.logout}>Выйти</a>
    &nbsp;
    &nbsp;
    &nbsp;
    <a href="#" onClick={this.togglePopup.bind(this)}>Зарегистрироваться</a>

    <a href="#" onClick={this.toggleAuth.bind(this)}> Войти</a>
    {this.state.showLogin ?
      <div><form onSubmit={this.login}>
         Никнейм:<input type="text" value={this.state.login} onChange={this.nameChange} />
         Пароль:<input type="password" value={this.state.password} onChange={this.pasChange} />
         <input type="submit" value="Отправить" />
         </form></div> :null}
    {this.state.showPopup ?
  <Popup
    text='Close Me'
    closePopup={this.togglePopup.bind(this)}
  />
  : null
}
    <a href="#" onClick={this.toggleAll.bind(this)}> Все события</a>
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
      center: [55.751605, 37.621508],
      zoom: 12,
    }}
    width={"100%"} height={800}>
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
