import React from 'react';
import './orders.css';
import {InputGroup, FormGroup, FormControl, Label, ListGroupItem, ListGroup, Modal, Grid, Col, Row, Image, Button , ButtonToolbar } from 'react-bootstrap';
import axios from 'axios';


class Order extends React.Component{
    render() {
        return (
            <Col xs={3} sm={3} > 


          <div className='order'>
              <Image className="order-image" src="https://www.happyceliac.com/wp-content/uploads/2018/02/placeholder-image.png" circle/>
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
    axios.get('http://myapp.com:3000/orders/').then( (res) => this.get_data(res));
  }
    get_data (resposne){
      document.data = resposne.data.data;
      this.setState({data : resposne.data.data});
    }

    render(){
        var present = ""
        var grid;
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
                        console.log("here");
                        return (<Row className='order-row'> <Order data={subslice[0]} /> </Row>)
                      } else if (! subslice[2]){
                        console.log("here 2");
                         return (<Row className='order-row'> <Order data={subslice[0]} />
                        <Order data={subslice[1]} /></Row>)
                      } else {
                        console.log("here 3");
                        return (<Row className='order-row'>
                        <Order data={subslice[0]} />
                        <Order data={subslice[1]} />
                        <Order data={subslice[2]} />
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
    render (){
        return (<div className='side-panel'>
                     Post a job
                    <FormGroup> 
                   <FormControl className='form'
                             type="text"
                             placeholder="description" />
                    <FormControl className='form'
                              type="text"
                                placeholder="category" />
                     <FormControl  className='form'
                                type="text"
                                placeholder="date" />
                     <FormControl  className='form'
                                type="text"
                                placeholder="payment" />
  
                    <div className='create-order-button'>
                    <Button bsStyle='primary' > Create </Button>
                    </div>
                    </FormGroup> 
                 </div>
            )
    }

}
const PresentOrders = (props) =>
(
    <div className='side-panel'> 
     </div>
);

class OrdersView extends React.Component{
    render(){
        return (<Grid> 
         <Row>
            <Col xs={3} sm={3}>
            <CreateEventView />
                </Col>

            <Col xs={9} sm={9}>
            <Grid>
            <Row>
                <PresentOrders />
                </Row>
                <Row>
                <OrdersPanel />
                </Row>
            </Grid>

          </Col>
            </Row>

        </Grid>)
    }
}


export default OrdersView;