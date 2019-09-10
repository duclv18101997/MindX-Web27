import React, { Component } from 'react';

class CreateGameScreen extends Component {

    state = {
        player1: '',
        player2: '',
        player3: '',
        player4: '',
    }

    handlePlayerNamechange = (playerNumber, value) => {
        const player =`player${playerNumber}`;
        this.setState({
            [player]: value,
        })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        //fetch
        fetch('http://localhost:8080/create-new-game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                playerA: this.state.player1,
                playerB: this.state.player2,
                playerC: this.state.player3,
                playerD: this.state.player4,
            }),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                  window.location.href = `/games/${data.data._id}`;
            })
            .catch((error) => {
                window.alert(error.message);
            })
    }
    render() {
        return (
            <div className="container">
            <div className="title">
                <h3>ScoreKeeper</h3>
            </div>
            <form className="create-form" onSubmit={this.handleFormSubmit}>
                <div className="form-row">
                    <div className="col">
                        <input type="text" className="form-control" id="playerA" placeholder="Player 1" value={this.state.player1}
                        onChange={(event) => {
                            this.handlePlayerNamechange(1,event.target.value);
                        }}
                        />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" id="playerB" placeholder="Player 2" value={this.state.player2}
                         onChange={(event) => {
                            this.handlePlayerNamechange(2,event.target.value);
                        }}
                        />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" id="playerC" placeholder="Player 3" value={this.state.player3}
                         onChange={(event) => {
                            this.handlePlayerNamechange(3,event.target.value);
                        }}
                        />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" id="playerD" placeholder="Player 4" value={this.state.player4}
                         onChange={(event) => {
                            this.handlePlayerNamechange(4,event.target.value);
                        }}
                        />
                    </div>
    
                </div>
    
                <div className="add-new-round">
                        <input type="submit" className="btn btn-primary" id='btn-create' value="Create New Game" />
                  </div>
            </form>
        </div>
        );
    }
}

export default CreateGameScreen;