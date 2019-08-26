window.onload = () => {
    const pathName = window.location.pathname;
    const pathNamePart = pathName.split('/');
    const gameId = pathNamePart[pathNamePart.length - 1];
    fetch(`/get-game-by-id?gameId=${gameId}`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const roundsElement = document.querySelector('.rounds');
            console.log(data.data);
            // innerHTML th tag
            document.querySelector('.name-playerA').innerHTML = data.data.player1.name;
            document.querySelector('.name-playerB').innerHTML = data.data.player2.name;
            document.querySelector('.name-playerC').innerHTML = data.data.player3.name;
            document.querySelector('.name-playerD').innerHTML = data.data.player4.name;

            // show total score from db
            

            // calculate and show total score
            document.querySelector('.total-scoreA').value = calculateScore(data.data.player1.score.rounds);
            document.querySelector('.total-scoreB').value = calculateScore(data.data.player2.score.rounds);
            document.querySelector('.total-scoreC').value = calculateScore(data.data.player3.score.rounds);
            document.querySelector('.total-scoreD').value = calculateScore(data.data.player4.score.rounds);

            // show score of player
            for (let i = 0; i < data.data.playerA.score.rounds.length; i++) {
                const item = `
                    <tr>
                        <th scope="row">Round ${i + 1}</th>
                        <td>
                            <input type="text" class="form-control playerA" name="scorePlayerA" value="${data.data.player1.score.rounds[i]}" />
                        </td>
                        <td>
                            <input type="text" class="form-control playerB" name="scorePlayerB" value="${data.data.player2.score.rounds[i]}" />
                        </td>
                        <td>
                            <input type="text" class="form-control playerC" name="scorePlayerC" value="${data.data.player3.score.rounds[i]}" />
                        </td>
                        <td>
                            <input type="text" class="form-control playerD" name="scorePlayerD" value="${data.data.player4.score.rounds[i]}" />
                        </td>
                    </tr>
                `;
                roundsElement.insertAdjacentHTML('beforeend', item);
            }

            // update score and total score
            updateScore('playerA', data.data);
            updateScore('playerB', data.data);
            updateScore('playerC', data.data);
            updateScore('playerD', data.data);

            
            // add new round
            const addNewRound = document.querySelector('.btn-primary');
            if (addNewRound) {
                addNewRound.addEventListener('click', (event) => {
                    const item = `
                        <tr>
                            <th scope="row">Round X</th>
                            <td>
                                <input type="text" class="form-control playerAA" name="scorePlayerA" value="" />
                            </td>
                            <td>
                                <input type="text" class="form-control playerB" name="scorePlayerB" value="" />
                            </td>
                            <td>
                                <input type="text" class="form-control playerC" name="scorePlayerC" value="" />
                            </td>
                            <td>
                                <input type="text" class="form-control playerD" name="scorePlayerD" value="" />
                            </td>
                        </tr>
                    `;
                    roundsElement.insertAdjacentHTML('beforeend', item);
                    
                    const playerA = document.querySelector('.playerAA');
                    console.log(playerA);
                    playerA.addEventListener('input', e => {
                        console.log(playerA.value);
                    });
                });
            }
        })
        .catch((error) => {
            window.alert(error.message);
        });
};

const calculateScore = (player) => {
    let totalScore = 0;
    player.forEach((element) => {
        totalScore = totalScore + element;
    });
    return totalScore;
};

const updateScore = (player, data) => {
    const listElement = document.querySelectorAll(`.${player}`);
    console.log(listElement);
    let timeOut = null;
    for (let i = 0; i < listElement.length; i++) {
        listElement[i].addEventListener('input', (event) => {
            clearTimeout(timeOut);
            timeOut = setTimeout(() => {
                if (isNaN(listElement[i].value)) {
                    listElement[i].value = 0;
                    window.alert('Your value is not number! Regarded as 0 number... ');
                }
                // console.log(listElement[i].value);
                fetch('/update-score', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        scoreValue: Number(listElement[i].value),
                        data: data,
                        index: i,
                        player: player,
                    }),
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        window.location.reload();
                        // window.location.href = `/games/${data.data._id}`;
                    })
                    .catch((error) => {
                        window.alert(error.message);
                    });
            }, 1000);
        });
    }
};