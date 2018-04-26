import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import OrdersView from './orders'
import { Grid, Col, Image,Row, Button, ButtonToolbar, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import axios from 'axios';



const create_order_url = function (access_token, 
                 description, 
                 location,
                 category, 
                 payment,
                 facebook_id) {
      return "http://myapp.com:3000/neworder/?description="+description+
              "&location=" + location + "&category="+category +
              "&payment="+ payment + "&facebook_id=" + facebook_id +
              "&access_token=" + access_token;  
}

class Boots extends React.Component {
  render() {
    return (
      <div className="Boots">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous" />  
        <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />


        </div>
    );
  }
}


class Hero extends React.Component {
	render(){
		return(
			<ButtonToolbar>
				<Button bsStyle = "success"> press me </Button>
			</ButtonToolbar>
		)
	}

}

class Donors extends React.Component {
	render(){
	return (
		<div className="container-fluid donor-div" >
			<div className='fixed_right'>
				<h3>
					Variety of services given by Volunteers for your needs.
				</h3>
				<h5>
					volunteers are teenagers with a will to give. their payment will be given to a charity of their choice.
				</h5>
			</div>
		</div>)
	}
}

class Charities extends React.Component {
	render(){
		return(
			<div className="container-fluid donor-div" >
				<div className='fixed_left'>
					<h3>
						The most profitable donation.
					</h3>
					<h5> 
						 Do.Bee’s volunteers donate to charity money they earned by doing jobs for users.  
					</h5>
				</div>
			</div>)
			
	}
}
class Volunteer extends React.Component {
	render(){
		return(
			<div className="container-fluid donor-div">
				<div className="fixed_left">
					<h3>
						Become a volunteer!
					</h3>
					<h5>
						You will decide which one of three organization will get your donation.
					</h5>
				</div>
			</div>
		)
	}
}

const navbar = {backgroundColor: '#F76E10'};
class TopBar extends React.Component{
	render(){
		return(
			<Navbar background-color="red">
			  <Navbar.Header>
			    <Navbar.Brand>
			      <a href="#brand">
                <img className='logo' src={require('./Logo.png')} />
                </a>
			    </Navbar.Brand>
			  </Navbar.Header>
			  <Navbar.Collapse>

			    <Nav pullRight>
			      <NavItem eventKey={2} href="#">
			        <LoginView set_facebook_id={(facebook_id, 
                                access_token) => this.props.set_facebook_id(facebook_id,access_token)} />
			      </NavItem>
			    </Nav>
			  </Navbar.Collapse>
			</Navbar>
			
		)	
	}
}

	


class FullSite extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    set_facebook_id(facebook_id, access_token){
        var state = Object.assign({}, this.state);
        state.facebook_id = facebook_id;
        state.access_token = access_token;
        this.setState(state);
    }
    create_function(data){
// const create_order_url = function (access_token, 
//                  description, 
//                  location,
//                  category, 
//                  payment,
//                  facebook_id) {
        var url = create_order_url(this.state.access_token,
            data.description,
            data.location,
            data.category,
            data.payment,
            this.state.facebook_id);
        console.log(url);

    }
	render(){
		return (
			<div>
				<Boots />			

				<Grid className="container-fluid"> 
	                
	                <Row >
	                	<TopBar  set_facebook_id={(facebook_id, 
                                access_token) => this.set_facebook_id(facebook_id,access_token)}/>

	                </Row>
	                <Row>

	            		<Charities />

	            	</Row>

	            	<Row>
	            		<Donors />

	            	</Row>

	            	<Row>
	            		<Volunteer />

	            	</Row>

    	            </Grid>
	        </div>


        )

		
		
	}
}

    // <OrdersView create_function={(data) => this.create_function(data)}/>

const facebook_login_url = "https://www.facebook.com/v2.12/dialog/oauth?client_id=649758841720130&redirect_uri=http://myapp.com/&response_type=token&state={state-param}";
 
const move_to_facebook = function(){
    document.location = facebook_login_url;
}

const get_access_token = function (){
    var re = new RegExp('access_token=(.*?)&');
    var array = re.exec(document.location);
    if (array){
        return array[0].slice(13);
    } else {
        return "";
    }
}

const FacebookLogin= (props) => (
    <Button onClick={() => move_to_facebook()} bsStyle = "primary"> {props.text} </Button>
);

class LoginView extends React.Component{
    set_facebook_id(resposne){
        this.setState({access_token : this.state.access_token,
                        facebook_id : resposne.data.facebook_id})
        this.props.set_facebook_id(resposne.data.facebook_id,
                            this.state.access_token);
    }
    constructor(props) {
        super(props);
        this.state = {access_token: get_access_token()};
        if(this.state.access_token){
            axios.get('http://localhost:3000/login/?access_token='+ this.state.access_token).then((res) => this.set_facebook_id(res));
        }
    }
    render() {
        if (this.state.access_token){
            return <div> <img className='user-picture' src={'http://graph.facebook.com/me/picture?access_token='+this.state.access_token} /></div>;
        } else {
            return <FacebookLogin text={"Login with facebook"} / >
        }

    }
}



ReactDOM.render(<FullSite />, 

	document.getElementById('root'));

