import React, { Component } from 'react';
import ShowScore from './ShowScore';

class GameDetailScreen extends Component {
  timeOut = null;
  state = {
    namePlayer1: '',
    namePlayer2: '',
    namePlayer3: '',
    namPlayer4: '',
    scores1: [],
    scores2: [],
    scores3: [],
    scores4: [],
    total1: 0,
    total2: 0,
    total3: 0,
    total4: 0,
    gameId: '',
  };

  // calculate total score of player
  calculateTotalScore = (player) => {
    let totalScore = 0;
    player.forEach((element) => {
      totalScore = totalScore + element;
    });
    return totalScore;
  };

  UNSAFE_componentWillMount() {
    // get game id from url
    const pathName = window.location.pathname;
    const pathNamePart = pathName.split('/');
    const gameId = pathNamePart[pathNamePart.length - 1];

    //fetch api
    fetch(`http://localhost:8080/get-game-by-id?gameId=${gameId}`, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          namePlayer1: data.data.playerA.name,
          namePlayer2: data.data.playerB.name,
          namePlayer3: data.data.playerC.name,
          namePlayer4: data.data.playerD.name,
          scores1: data.data.playerA.scores,
          scores2: data.data.playerB.scores,
          scores3: data.data.playerC.scores,
          scores4: data.data.playerD.scores,
          total1: this.calculateTotalScore(data.data.playerA.scores),
          total2: this.calculateTotalScore(data.data.playerB.scores),
          total3: this.calculateTotalScore(data.data.playerC.scores),
          total4: this.calculateTotalScore(data.data.playerD.scores),
          gameId: gameId,
        });
      })
      .catch((error) => {
        window.alert(error.message);
      })
  };

  // fetch api update score to score array
  fetchUpdateScore = (inputValue, gameId, index, player) => {
    fetch('http://localhost:8080/update-score', {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        scoreValue: Number(inputValue),
        gameId: gameId,
        index: index,
        player: player,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          total1: this.calculateTotalScore(data.data.playerA.scores),
          total2: this.calculateTotalScore(data.data.playerB.scores),
          total3: this.calculateTotalScore(data.data.playerC.scores),
          total4: this.calculateTotalScore(data.data.playerD.scores),
        });
      })
      .catch((error) => {
        window.alert(error.message);
      })
  };

  // handle input text
  inputChange = (event, scores, index, array, player) => {
    const newScore = (event.target.value);
    const newArray = scores.slice();
    newArray[index] = newScore;
    this.setState({
      [array]: newArray,
    });
    clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      this.fetchUpdateScore(newScore, this.state.gameId, index, player);
    }, 1000);
  };

  // fetch api add new round to game
  fetchAddRound = (gameId) => {
    fetch('http://localhost:8080/add-new-round', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: gameId,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {

      })
      .catch((error) => {
        window.alert(error.message);
      })
  };

  // handle add new round to game
  addNewRound = () => {
    this.setState({
      scores1: this.state.scores1.concat(0),
      scores2: this.state.scores2.concat(0),
      scores3: this.state.scores3.concat(0),
      scores4: this.state.scores4.concat(0),
    });
    this.fetchAddRound(this.state.gameId);
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="title">
            <h3>ScoreKeeper</h3>
          </div>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col"></th>
                <th scope="col" className="name-playerA">{this.state.namePlayer1}</th>
                <th scope="col" className="name-playerB">{this.state.namePlayer2}</th>
                <th scope="col" className="name-playerC">{this.state.namePlayer3}</th>
                <th scope="col" className="name-playerD">{this.state.namePlayer4}</th>
              </tr>
            </thead>
            <tbody className="rounds">
              <tr>
                <th scope="row">Sum Of Scores</th>
                <td>
                  <input type="text" className="form-control total-scoreA" name="sumPlayerA"
                    value={this.state.total1}
                    disabled />
                </td>
                <td>
                  <input type="text" className="form-control total-scoreB" name="sumPlayerB"
                    value={this.state.total2}
                    disabled />
                </td>
                <td>
                  <input type="text" className="form-control total-scoreC" name="sumPlayerC"
                    value={this.state.total3}
                    disabled />
                </td>
                <td>
                  <input type="text" className="form-control total-scoreD" name="sumPlayerD"
                    value={this.state.total4}
                    disabled />
                </td>
              </tr>
              {
                this.state.scores1.map((value, index) => {
                  return (
                    <ShowScore
                      value1={this.state.scores1[index]}
                      value2={this.state.scores2[index]}
                      value3={this.state.scores3[index]}
                      value4={this.state.scores4[index]}
                      index={index}
                      key={index}
                      inputChange={this.inputChange}
                      scores1={this.state.scores1}
                      scores2={this.state.scores2}
                      scores3={this.state.scores3}
                      scores4={this.state.scores4}
                    />
                  );
                })
              }
            </tbody>
          </table>
          <div className="add-new-round">
            <button className="btn btn-primary" type="submit" onClick={this.addNewRound}>Add New Round</button>
          </div>
        </div>
      </div>
    );
  }
}

export default GameDetailScreen;