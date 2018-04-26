import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
    <button onClick={() => move_to_facebook()} > {props.text} </button>
);

class LoginView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {session_id : get_session_id()};
    }
    render() {
        if (this.state.session_id){
            return <div> {this.state.session_id} </div>;
        } else {
            return <FacebookLogin text={"Login with facebook"} / >
        }

    }
}
class App extends React.Component{
	render(){
		return (<div> 
            <LoginView />
            </div>)
	}
}
ReactDOM.render(<App />, 

	document.getElementById('root'));

