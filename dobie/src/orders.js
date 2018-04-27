import React from 'react';
import './orders.css';
import {InputGroup, FormGroup, FormControl, Label, ListGroupItem, ListGroup, Modal, Grid, Col, Row, Image, Button , ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';



class Order extends React.Component{
  constructor(props){
    super(props);
    var self =this;
  }
    render() {
        return (
            <Col xs={3} sm={3} > 


          <div className='order' onClick={() => this.props.show_modal(this.props.data)}>
              <Image className="order-image" src={require('./placeholder-image.png')} circle/>
            <div className="order-description">
                  {this.props.data ? this.props.data.description : ""}
            </div>
            <div className='order-price'>
                ${this.props.data.payment} 
            </div>
            </div>
            <div className='buffer'></div>
             </Col>  
            );
    }
}
class OrdersPanel extends React.Component{
  constructor(props){
    super(props);
    this.state = {data : null};
    document.self = this;
    axios.get('http://myapp.com:3000/orders/').then( (res) => this.get_data(res));
  }
    get_data (resposne){
      document.data = resposne.data.data;
      this.setState({data : resposne.data.data});
    }
    show_modal(data){
      this.props.show_modal(data);
    }

    render(){
        var present = ""
        var grid;
        var me = document.self;
        if (this.state.data){
          var copy = this.state.data.slice();
          document.copy = copy;
          var array = [];
          while (copy.length > 0){
             var subslice = copy.splice(0,3);
             array.push(subslice);
           }

              present = array.map(function(subslice) {
                    document.subslice = subslice;
                      if (! subslice[1]){
                        return (<Row className='order-row'> <Order show_modal = {(data) => me.show_modal(data)} data={subslice[0]} /> </Row>);
                      } else if (! subslice[2]){
                         return (<Row className='order-row'> <Order show_modal = {(data) => me.show_modal(data)} data={subslice[0]} />
                        <Order show_modal={(data) => me.show_modal(data)} data={subslice[1]} /></Row>);
                      } else {
                        return (<Row className='order-row'>
                        <Order show_modal = {(data) => me.show_modal(data)} data={subslice[0]} />
                        <Order show_modal = {(data) => me.show_modal(data)} data={subslice[1]} />
                        <Order show_modal = {(data) => me.show_modal(data)} data={subslice[2]} />
                    </Row>);
                      }
              });
              


        } else {

        }
        return (
                <Grid>
                  {present}
                </Grid>
            )
    }
}
class CreateEventView extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        description  : "",
        category : "",
        placeholder : "",
        payment :"",
        sent : false,
      };
  }
    change_description(e){
      this.state.description = e.target.value;
    }
    change_category(e){
      this.state.category= e.target.value;
    }
    change_date (e){
      this.state.date = e.target.value;
    }
    change_payment(e){
      this.state.payment = e.target.value;
    }
    create (){
      this.props.create_function(this.state);
      this.setState({
        description  : "",
        category : "",
        placeholder : "",
        payment :"",
        sent : true,
      });
    }
    render (){
      if (this.state.sent){
        return (<div className='side-panel'> 
            Order was added!
        </div>) 
      } else {
        return (<div className='side-panel'>
                     Post a job
                    <FormGroup> 
                   <FormControl className='form'
                             type="text"
                             placeholder="description" 
                             onChange = {(e) => this.change_description(e)}/>
                    <FormControl className='form'
                              type="text"
                                placeholder="category" 
                             onChange = {(e) => this.change_category(e)}/>
                     <FormControl  className='form'
                                type="text"
                                placeholder="date" 
                             onChange = {(e) => this.change_date(e)}/>
                     <FormControl className='form'
                                type="text"
                                placeholder="payment" 
                             onChange = {(e) => this.change_payment(e)}/>
  
                    <div className='create-order-button'>
                    <Button bsStyle='primary' onClick={() => this.create()} > Create </Button>
                    </div>
                    </FormGroup> 
                 </div>
            )
          }

      }
      }
const PresentOrders = (props) =>
(
    <div className='side-panel'> 
     </div>
);

class OrdersView extends React.Component{
    constructor(props){
      super(props);
    }
    render(){
        return (<Grid> 
         <Row>
            <Col xs={3} sm={3}>
            <CreateEventView create_function = {(data) => this.props.create_function(data)}
                              />
                </Col>

            <Col xs={9} sm={9}>
            <Grid>
            <Row>
                <PresentOrders />
                </Row>
                <Row>
                <OrdersPanel show_modal = {(data) => this.props.show_modal(data)}  />
                </Row>
            </Grid>

          </Col>
            </Row>

        </Grid>)
    }
}


export default OrdersView;