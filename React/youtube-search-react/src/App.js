import React from 'react';
import logo from './logo.svg';
import './App.css';
import ResultList from './components/ResultList';
import Error from './components/Error';

let isLoading;
let flag = true;
let timeOut = null;

class App extends React.Component {

  state = {
    inputValue: '',
    results: [],
  }

  handleInputChange = (event) => {
    const keyWord = event.target.value;
    this.setState({
      inputValue: keyWord,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      inputValue: '',
    })
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      this.fetchData();
    }, 1000)

  }



  //fetch
  fetchData = () => {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${this.state.inputValue}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`, {
      method: 'GET'
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        isLoading = data.nextPageToken;
        this.setState({
          results: data.items
        })

        window.addEventListener('scroll', () => {
          if (document.documentElement.offsetHeight - window.innerHeight - window.scrollY <= 200 && flag) {
            flag = false;
            fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${this.state.inputValue}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${isLoading}`,
              {
                method: 'GET'
              })
              .then((response) => {
                return response.json();
              })
              .then((data) => {
                isLoading = data.nextPageToken;
                this.setState({
                  results: data.items
                })
              })
              .then(() => {
                flag = true;
              })
              .catch((err) => {
                console.log(err);
                window.alert(err.message);
              })
          }
        })
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.message);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <img src="https://www1-lw.xda-cdn.com/files/2017/08/After-12-Years-Google-Gives-YouTube-a-New-Logo.png"
              alt="" />
            <h1>Let's search!</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <form id="search" onInput={this.handleSubmit}>
              <div className="form-group">
                <input type="text"
                  name="keyword"
                  id="keyword"
                  className="form-control"
                  value={this.state.inputValue}
                  onChange={this.handleInputChange}
                  required />
                <br></br>
                <button className="btn btn-primary form-control">Search</button>
              </div>
            </form>
          </div>
        </div>
        <div className="spinner-border text-primary" id='spinner' role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="row">
          <div className="col-md-12" id="result-list">
            {this.state.results.map((value, index) => {
                if (this.state.results.length == 0) {
                  return (
                    <Error />
                  )
                } else {
                  return (
                    <ResultList
                      videoId={value.id.videoId}
                      imgUrl={value.snippet.thumbnails.default.url}
                      title={value.snippet.title}
                      description={value.snippet.description}
                      key={index}
                    />
                  )
                }
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
