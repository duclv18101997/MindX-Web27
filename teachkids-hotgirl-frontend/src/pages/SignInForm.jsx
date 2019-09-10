import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { async } from 'q';

class SignInForm extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: '',
    loading: false,
  }

  handleEmailChange = (event) => {
    const newEmail = event.target.value;
    this.setState({
      email: newEmail,
    });
  };

  handlePasswordChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      password: newValue,
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({
      errorMessage: '',
      loading: true,
    })
    try {
      //fetch
      const data = await fetch(`http://localhost:3001/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      })
        .then((response) => {
          return response.json();
        })
      if (!data.success) {
        this.setState({
          errorMessage: data.message,
        })
      } else {
        //save data to local storeage
        window.localStorage.setItem('email', data.data.email);

        window.location.href = `/`;
      }

    } catch (err) {
      this.setState({
        errorMessage: err.message
      })
    } finally {
      this.setState({
        loading: false,
      })
    }

  }

  render() {
    return (
      <div className="App">
        <div className="App__Aside"></div>
        <div className="App__Form">
          <div className="FormTitle">
            <NavLink to="/login" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink>
            or <NavLink exact to="/register" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
          </div>
          <div className="FormCenter">
            <form className="FormFields" onSubmit={this.handleSubmit} >
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email"
                  value={this.state.email}
                  onChange={this.handleEmailChange.bind()}
                />
              </div>

              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange.bind()}
                />
              </div>


              {this.state.errorMessage ? (
                <div className="alert alert-danger" role="alert">
                  {this.state.errorMessage}
                </div>
              ) : null
              }


              <div className="FormField">
                {this.state.loading ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                    <button className="FormField__Button mr-20" >Sign In</button>
                  )}
                <Link to="/register" className="FormField__Link">
                  Create Account</Link>
              </div>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

export default SignInForm;