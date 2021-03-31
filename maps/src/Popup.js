import './App.css';
import * as fs from 'fs'
import { YMaps, Map,GeoObject, Placemark, Polyline, Rectangle, Polygon, Circle, Clusterer, ObjectManager } from 'react-yandex-maps';
import * as coor from "./places";
import { Button, Navbar,Nav ,Container,Form} from 'react-bootstrap'
import  React, { Component } from  'react';
import  CustomersService  from  './ClientUp';

const axios = require('axios').default;
const  customersService  =  new  CustomersService();

const API_URL = 'http://localhost:9000';
var fae=''


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
  event.preventDefault()
  axios.post(API_URL+'/usercase/api/reg/',{
"username":this.state.name,
"password":this.state.pas,
"email":this.state.email
}).then(res => {
alert(res.data["data"]);
window.location.reload()
    },
    //window.location.reload(),
    // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
    // чтобы не перехватывать исключения из ошибок в самих компонентах.
    (error) => {
      //console.log(this.state.items);
alert("something goes wrong")
window.location.reload()
    }
  )

    }


 render() {
  return(

    <Form className="justify-content-end" onSubmit={this.register}>


<Form.Group className="justify-content-center">
  <Form.Label>Никнейм</Form.Label>
  <Form.Control type="text"  value={this.state.name} onChange={this.nameChange}/>
</Form.Group >
     <Form.Group controlId="formBasicEmail" className="justify-content-center">
   <Form.Label>Email</Form.Label>
   <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.emailChange}/>
   <Form.Text className="text-muted">
     Никто,кроме администратора не увидит вашу почту :)
   </Form.Text>
 </Form.Group>
 <Form.Group controlId="formBasicPassword" className="justify-content-center">
     <Form.Label>Пароль</Form.Label>
     <Form.Control type="password" placeholder="Password" value={this.state.pas} onChange={this.pasChange} />
   </Form.Group>
   <Button variant="primary" type="submit">
 Зарегистрироваться
</Button>

     </Form>);  }
}
export default Popup;
