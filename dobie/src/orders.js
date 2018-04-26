import React from 'react';
import './orders.css'
import {InputGroup, FormGroup, FormControl, Label, ListGroupItem, ListGroup, Modal, Grid, Col, Row, Image, Button , ButtonToolbar } from 'react-bootstrap';

class Order extends React.Component{
    render() {
        return (
            <Col xs={3} sm={3} > 
            <div className="static-modal">
                <ListGroup className='single-order'>
                  <ListGroupItem>
                      <Image className="order-image" src="https://www.happyceliac.com/wp-content/uploads/2018/02/placeholder-image.png" circle/>
                  </ListGroupItem>
                  <ListGroupItem>{this.props.description}</ListGroupItem>
                </ListGroup>
            </div>
             </Col>  
            );
    }
}
class OrdersPanel extends React.Component{
    render(){
        return (
                <Grid>
                    <Row>
                        <Order description="Drive to Airport" />
                        <Order description="Walk the dog" />
                        <Order description="Care for Cat" />
                    </Row>
                     <Row>
                         <Order description="Drive to Airport" />
                        <Order description="Walk the dog" />
                        <Order description="Care for Cat" />
                    </Row>
                </Grid>
            )
    }
}
class CreateEventView extends React.Component{
    render (){
        return (<div className='side-panel'>
                     Post a job
                    <FormGroup> 
                   <FormControl 
                             type="text"
                             placeholder="description" />
                    <FormControl 
                              type="text"
                                placeholder="category" />
                     <FormControl 
                                type="text"
                                placeholder="date" />
                     <FormControl 
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