import  React, { Component } from  'react';
const API_URL = 'http://localhost:8000';
const axios = require('axios').default;


class Item extends  Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {    this.setState({value: event.target.value});  }
  handleSubmit(event) {
    console.log(this.state.value)
    if (!this.state.value){
      this.props.onChange(null)
    }

    //console.log(typeof Number(this.state.value))
    event.preventDefault();
    axios({
  method: 'get',
  url: 'http://localhost:8000/usercase/api/item',
  data: {
    'Item':this.state.value
  }
  }).then((response) => {

  console.log(response);
  this.setState({
    isLoaded: true,
    items: response
  });
  console.log('sqs',response)
  }, (error) => {
  console.log(error);
  });
}
render(){
  console.log('ss',this.state)
  const ss=this.state.items
  console.log(ss)
  return ({ss})
}
}
export default Item;
