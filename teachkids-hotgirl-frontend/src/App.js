import React from 'react';
import './App.css';
import { BrowserRouter, Route,  Switch } from 'react-router-dom';
import SignInForm from './pages/SignInForm';
import SignUpForm from './pages/SignUpForm';
import HomePage from './pages/HomePage';
import CurrentUser from './pages/CurentUser';
import Post from './pages/Post';
import { async } from 'q';

class App extends React.Component {
  state = {
    currentUser : '',
    fullName: '',
  }

  componentWillMount() {
    const CurentUser = window.localStorage.getItem('email'); 
    const fullName = window.localStorage.getItem('fullName');
    this.setState({
      currentUser : CurentUser,
      fullName: fullName,
    })
  }

  handleLogout = async () => {
    //fetch
    const data = await fetch(`http://localhost:3001/users/logout`, {
      method: 'GET'
    })
    .then((response) => {
      return response.json();
    })

    //clear storage
    if(data.success){
      window.localStorage.removeItem('email');
      window.location.href = `/login`;
    }
    //setState
    this.setState({
      currentUser: '',
    })
  }

  //Post
  handlePost = async (event) => {
    window.location.href = `/create-post`;
  }

  render () {
    return (
      <div>
        <nav style={{backgroundColor: '#c3d2db'}} className="navbar navbar-expand-lg navbar-light " >
          <a className="navbar-brand" href="/">Techkids Hotgirl</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
           aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {this.state.currentUser ? (
             <div className='navbar-nav mr-auto' style={{diplay: 'flex', alignItems: 'center'}}>
             Welcome {this.state.fullName}, <a className="nav-link"  onClick={this.handleLogout}>Log out!</a>
           </div>
            ) : (
              <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/login">Login<span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">Register</a>
              </li>
            </ul>
            )}

            {this.state.currentUser ? (
              <div className="col-1">
              <button className="btn btn btn-info" type="submit"  onClick={this.handlePost}>+ POST</button>
              </div>
            ) : null}
           
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
        <div className="container">
        <BrowserRouter >
          <Switch>
            <Route path="/register" component={SignUpForm}>
            </Route>
            <Route path="/login" component={SignInForm}>
            </Route>
            <Route path="/" component={HomePage} exact={true}>
            </Route>
            <Route path="/current-user" component={CurrentUser}>
            </Route>
            <Route path="/create-post" component={Post}>
            </Route>
          </Switch>
        </BrowserRouter>
        </div>
      </div>
  
    );
  }
}

export default App;
