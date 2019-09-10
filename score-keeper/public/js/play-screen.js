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
            // innerHTML th tag
            document.querySelector('.name-playerA').innerHTML = data.data.playerA.name;
            document.querySelector('.name-playerB').innerHTML = data.data.playerB.name;
            document.querySelector('.name-playerC').innerHTML = data.data.playerC.name;
            document.querySelector('.name-playerD').innerHTML = data.data.playerD.name;

            // show total score from db
            

            // calculate and show total score
            document.querySelector('.total-scoreA').value = calculateScore(data.data.playerA.scores);
            document.querySelector('.total-scoreB').value = calculateScore(data.data.playerB.scores);
            document.querySelector('.total-scoreC').value = calculateScore(data.data.playerC.scores);
            document.querySelector('.total-scoreD').value = calculateScore(data.data.playerD.scores);

            // show score of player
            for (let i = 0; i < data.data.playerA.scores.length; i++) {
                const item = `
                    <tr>
                        <th scope="row">Round ${i + 1}</th>
                        <td>
                            <input type="text" class="form-control playerA" name="scorePlayerA" value="${data.data.playerA.scores[i]}" />
                        </td>
                        <td>
                            <input type="text" class="form-control playerB" name="scorePlayerB" value="${data.data.playerB.scores[i]}" />
                        </td>
                        <td>
                            <input type="text" class="form-control playerC" name="scorePlayerC" value="${data.data.playerC.scores[i]}" />
                        </td>
                        <td>
                            <input type="text" class="form-control playerD" name="scorePlayerD" value="${data.data.playerD.scores[i]}" />
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
                    fetch('/add-new-round', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: data.data._id,
                        }),
                    })
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            const item = `
                                <tr>
                                    <th scope="row">Round ${data.data.playerA.scores.length + 1}</th>
                                    <td>
                                        <input type="text" class="form-control playerA" name="scorePlayerA" value="" />
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

                            // update score and total score
                            updateScore('playerA', data.data);
                            updateScore('playerB', data.data);
                            updateScore('playerC', data.data);
                            updateScore('playerD', data.data);
                        })
                        .catch((error) => {
                            window.alert(error.message);
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
    let timeOut = null;
    for (let i = 0; i < listElement.length; i++) {
        listElement[i].addEventListener('input', (event) => {
            // console.log(listElement[i]);
            clearTimeout(timeOut);
            timeOut = setTimeout(() => {
                if (isNaN(listElement[i].value)) {
                    Swal.fire({
                        type: 'error',
                        title: 'Unauthorized',
                        text: 'Your value is not number!',
                    })
                } else {
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
                            document.querySelector('.total-scoreA').value = calculateScore(data.data.playerA.scores);
                            document.querySelector('.total-scoreB').value = calculateScore(data.data.playerB.scores);
                            document.querySelector('.total-scoreC').value = calculateScore(data.data.playerC.scores);
                            document.querySelector('.total-scoreD').value = calculateScore(data.data.playerD.scores);
                        })
                        .catch((error) => {
                            window.alert(error.message);
                        });
                }
            }, 1000);
        });
    }
};