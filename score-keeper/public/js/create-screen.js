window.onload = () => {
    const btnCreate = document.getElementById('btn-create');
    if (btnCreate) {
        btnCreate.addEventListener('click', (event) => {
            event.preventDefault();
            const playerA = document.getElementById('playerA').value;
            const playerB = document.getElementById('playerB').value;
            const playerC = document.getElementById('playerC').value;
            const playerD = document.getElementById('playerD').value;
            fetch('/create-new-game', {
                method: 'POST',    
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    playerA: playerA,
                    playerB: playerB,
                    playerC: playerC,
                    playerD: playerD,
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                window.location.href = `/games/${data.data._id}`;
            })
            .catch((error) => {
                console.log(error);
                window.alert(error.message);
            });
        })
    }
}