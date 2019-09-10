window.onload = () => {
    const createGameForm = document.querySelector('.create-form');
    if (createGameForm) {
        createGameForm.addEventListener('submit', (event) => {
            event.preventDefault();
            if (!createGameForm.playerA.value || !createGameForm.playerB.value || !createGameForm.playerC.value || !createGameForm.playerD.value) {
                Swal.fire({
                    type: 'error',
                    title: 'Unauthorized',
                    text: 'You must fill all fields!',
                })
            } else {
                fetch('/create-new-game', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        playerA: createGameForm.playerA.value,
                        playerB: createGameForm.playerB.value,
                        playerC: createGameForm.playerC.value,
                        playerD: createGameForm.playerD.value,
                    }),
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        // console.log(data.data);
                        window.location.href = `/games/${data.data._id}`;
                    })
                    .catch((error) => {
                        window.alert(error.message);
                    })
            }
        });
    }
};