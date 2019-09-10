import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { async } from 'q';


class SignUpForm extends Component {
  state = {
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    errorMessage: '',
    isSuccess: false,
    counter: 3,
    loading: false,
  }

  handleEmailChange = (event) => {
    const newEmail = event.target.value;
    this.setState({
      email: newEmail,
    });
  };

  handleFullNameChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      fullName: newValue,

    });
  };

  handlePasswordChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      password: newValue,
    })
  }

  handleConfirmPasswordChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      confirmPassword: newValue,
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    //validate
    //email
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if (!emailRegex.test(this.state.email)) {
      this.setState({
        errorMessage : 'Email is not valid'
      })
    } else if (this.state.password.length < 6) {
      this.setState({
        errorMessage :'Password must be more than 6 characters'
      })
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        errorMessage : 'Password not match'
      })
    } else if (!this.state.fullName) {
      this.setState({
        errorMessage : 'Enter your fullName'
      })
    } else {
      this.setState({
        errorMessage: '',
        loading: true,
      })

      try {

        //fetch
        const data = await fetch('http://localhost:3001/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            email: this.state.email,
            fullName: this.state.fullName,
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
          this.setState({
            isSuccess: true,
          });
          setTimeout(() => {
            this.setState({
              counter: 2
            })
          }, 1000);
          setTimeout(() => {
            this.setState({
              counter: 1
            })
          }, 2000);
          setTimeout(() => {
            this.setState({
              counter: 0
            })
            window.location.href = `/login`;
          }, 3000);
        }
      } catch (err) {
        this.setState({
          errorMessage: err.message,
        })
      } finally {
        this.setState({
          loading: false,
        })
      }

    }

  };
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
            <form className="FormFields" onSubmit={this.handleSubmit}>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input id="email" className="FormField__Input" placeholder="Enter your email" name="email"
                  value={this.state.email}
                  onChange={this.handleEmailChange.bind()}
                />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">Full Name</label>
                <input type="text" id="name" className="FormField__Input" placeholder="Enter your full name" name="name"
                  value={this.state.fullName}
                  onChange={this.handleFullNameChange.bind()} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange.bind()}
                />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Confirm Password</label>
                <input type="password" id="confirm-password" className="FormField__Input" placeholder="Confirm your password"
                  name="confirm-password"
                  value={this.state.confirmPassword}
                  onChange={this.handleConfirmPasswordChange.bind()}
                />
              </div>

              {this.state.errorMessage ? (
                <div className="alert alert-danger" role="alert">
                  {this.state.errorMessage}
                </div>
              ) : null
              }

              {this.state.isSuccess ? (
                <div className="alert alert-success" role="alert">
                  Login success, redirect in {this.state.counter}s
              </div>
              ) : null}

              <div className="FormField">
                {this.state.loading ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                    <button className="FormField__Button mr-20" >Sign Up</button>
                  )}
                <Link to="/login" className="FormField__Link">
                  I'm already member</Link>
              </div>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

export default SignUpForm;