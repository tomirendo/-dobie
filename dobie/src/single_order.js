import React from 'react';
import './orders.css';
import {InputGroup, FormGroup, FormControl, Label, ListGroupItem, ListGroup, Modal, Grid, Col, Row, Image, Button , ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';


class SingleOrder extends React.Component{
    constructor(props){
        super(props);
        this.state = {message : null};
    }
    handle_change_message(event){
        this.setState({message : event.target.value});
    }
    send_message(){
        this.props.send_message(this.state.message, this.props.data.id);
    }

    render(){
        return (<div>
            <div className="static-modal">
  <Modal.Dialog>
    <Modal.Header>
      <Modal.Title> Order </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    Description: {this.props.data.description}<br />
    Category: {this.props.data.house}<br />
    By {this.props.data['publisher name']}<br />
    </Modal.Body>

    <Modal.Body>
      <FormGroup>
    <InputGroup>
      <FormControl  onChange={(e) => this.handle_change_message(e)} type="text" placeholder='Message' />
      <InputGroup.Button>
        <Button bsStyle='primary' onClick={() => this.send_message()}>Send!</Button>
      </InputGroup.Button>
    </InputGroup>
  </FormGroup>
    </Modal.Body>
    <Modal.Footer>
      <Button  onClick={() => this.props.close_modal()}>Close</Button>
    </Modal.Footer>
  </Modal.Dialog>
</div> 
         </div>)

    }
}


export default SingleOrder;