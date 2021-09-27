import logo from './logo.svg';
import './App.css';
import * as fs from 'fs'
import { YMaps, Map,GeoObject, Placemark, Polyline, Rectangle, Polygon, Circle, Clusterer, ObjectManager } from 'react-yandex-maps';
import * as coor from "./places";
import { Button, Navbar,Nav ,Container,Form} from 'react-bootstrap'
import  React, { Component } from  'react';
import  CustomersService  from  './ClientUp';
import Popup from './Popup';
import Recom from './Recom';
import Events from './Events';
const axios = require('axios').default;
const  customersService  =  new  CustomersService();

const API_URL = 'http://localhost:9000';
var fae=''
//console.log(coord[0]['default']['features'][50])
//console.log(coord[0]['default']['features'][51])



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
    event.preventDefault()
  var data={"username":this.state.login,"password":this.state.password}
  if (localStorage.getItem("token")==''){
  axios.post(API_URL+'/usercase/auth/token/login/',data).then(res => {

      localStorage.setItem("token",res.data.auth_token)
        this.setState({
          isLoaded: true,
          token: res.data.auth_token
        });
        alert("Привет!")
      window.location.reload()
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
        alert("Ошибка!")
        window.location.reload()
      }
    )
  }
  else{
    alert("Вы уже вошли!")
    window.location.reload()
  }
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

  var coord=items.data
  console.log(coord)
  if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
  return(

  <div class="map">



<Navbar bg="dark" variant="dark" expand="lg" sticky="top">
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">


          <Nav className="justify-content-start" activeKey="/home">
            <Nav.Link onClick={this.logout}>Выйти</Nav.Link>
          </Nav>


            <Nav  className="justify-content-center" variant="tabs" defaultActiveKey="/home">
              <Nav.Item>
                <Nav.Link onClick={this.toggleAll.bind(this)}> Все события</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={this.toggleEvents.bind(this)}> Мероприятия</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={this.toggleRecs.bind(this)}> Специально для вас</Nav.Link>
              </Nav.Item>
          </Nav>

          <Nav className="justify-content-end" activeKey="/home">
            <Nav.Link onClick={this.togglePopup.bind(this)}>Зарегистрироваться</Nav.Link>

            <Nav.Link onClick={this.toggleAuth.bind(this)}> Войти </Nav.Link>
          </Nav>

  </Navbar.Collapse>

</Navbar>
<Container>
{this.state.showLogin ?
  <div>
  <Form className="justify-content-end" onSubmit={this.login}>


<Form.Group className="justify-content-center">
<Form.Label>Никнейм</Form.Label>
<Form.Control type="text"  value={this.state.login} onChange={this.nameChange}/>
</Form.Group >
<Form.Group controlId="formBasicPassword" className="justify-content-center">
   <Form.Label>Пароль</Form.Label>
   <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.pasChange}/>
 </Form.Group>
 <Button variant="primary" type="submit">
Войти
</Button>

   </Form></div> :null}

{this.state.showPopup ?
<Popup
text='Close Me'
closePopup={this.togglePopup.bind(this)}
/>
: null
}
</Container>


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
</YMaps>
:null }
</div>

);
}
}
}
export default App;
