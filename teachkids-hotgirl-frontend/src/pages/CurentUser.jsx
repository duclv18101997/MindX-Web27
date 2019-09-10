import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 

class CurentUser extends Component {
    state = {
        email: '',
        password: '',
        login : false,
    }

    componentWillMount() {
        fetch('http://localhost:3001/users/test', {
            method: 'GET'
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            this.setState = {
                email: data.data.email,
                password: data.data.password,
                login: true,
            }
        })
    }
    render() {
        if(this.state.login === true){
            return (
                <div>
                    <span>this.state.email</span>
                    <span>this.state.password</span>
                </div>
            );
        }else{
            return (
                <div>
                <div>You are not login</div>
                <Link to="/login" className="FormField__Link">Login</Link>
                </div>
            )
        }
       
    }
}

export default CurentUser;