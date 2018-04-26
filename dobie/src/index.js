import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Grid, Col, Row, Button, ButtonToolbar, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';



class Boots extends React.Component {
  render() {
    return (
      <div className="Boots">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous" />  

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


class TopBar extends React.Component{
	render(){
		return(
			<Navbar inverse collapseOnSelec fixedTop>
			  <Navbar.Header>
			    <Navbar.Brand>
			      <a href="#brand">Dobie!</a>
			    </Navbar.Brand>
			    <Navbar.Toggle />
			  </Navbar.Header>
			  <Navbar.Collapse>
			    <Nav>
			      <NavItem eventKey={1} href="#">
			        Link
			      </NavItem>
			      <NavItem eventKey={2} href="#">
			        Link
			      </NavItem>
			      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
			        <MenuItem eventKey={3.1}>Action</MenuItem>
			        <MenuItem eventKey={3.2}>Another action</MenuItem>
			        <MenuItem eventKey={3.3}>Something else here</MenuItem>
			        <MenuItem divider />
			        <MenuItem eventKey={3.3}>Separated link</MenuItem>
			      </NavDropdown>
			    </Nav>
			    <Nav pullRight>
			      <NavItem eventKey={2} href="#">
			        <Button bsStyle="success"> log in </Button>
			      </NavItem>
			    </Nav>
			  </Navbar.Collapse>
			</Navbar>
			
		)	
	}
}

	


class FullSite extends React.Component{
	render(){
		return (
			
			<div>
				<Boots />			

				<Grid className="container-fluid"> 
	                
	                <Row >
	                	<TopBar />

	                </Row>
	                <Row>
	                	<img src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Jolly_green_giant.jpg"></img>
	            	</Row>
	            </Grid>
	        </div>


        )

		
		
	}
}


const facebook_login_url = "https://www.facebook.com/v2.12/dialog/oauth?client_id=649758841720130&redirect_uri=http://myapp.com/&response_type=token&state={state-param}";
 
const move_to_facebook = function(){
    document.location = facebook_login_url;
}

const get_session_id = function (){
    var url = new URL(document.location);
    var session_id = url.searchParams.get("session_id");
    return session_id;
}

const FacebookLogin= (props) => (
    <Button onClick={() => move_to_facebook()} bsStyle = "primary"> {props.text} </Button>
);

class LoginView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {session_id : get_session_id()};
    }
    render() {
        if (this.state.session_id){
            return <div>  </div>;
        } else {
            return <FacebookLogin text={"Login with facebook"} / >
        }

    }
}



ReactDOM.render(<FullSite />, 

	document.getElementById('root'));

