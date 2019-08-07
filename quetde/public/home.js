window.onload = () => {
 
    //get random question
    fetch(`/get-random-question`, {
        method: 'GET',
    })
        .then((response) => {
           // window.alert(response.json());
            return response.json();
        })
        .then((data) => {
            const questionContent = document.querySelector('.question-content');
        
            if (questionContent) {
                questionContent.innerHTML = data.message.content;
            }
            const like = document.getElementById('like');
            if (like) {
                like.addEventListener('click', (event) => {
                    event.preventDefault();
                    data.message.like += 1;
                    console.log(data);
                    fetch(`/save-vote`, {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json',
                        },
                        body: JSON.stringify({
                           questionContent : data.message,
                        })
                    })
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            window.location.href = `/questions/${data.data.id}`;
                        })
                        .catch((err) => {
                            console.log('Error: ', err);
                            window.alert(err.message);
                        })
                })
            };

            const dislike = document.getElementById('dislike');
            if (dislike) {
                dislike.addEventListener('click', (event) => {
                    event.preventDefault();
                    data.message.dislike += 1;
                    //lưu số like
                    fetch(`/save-vote`, {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json',
                        },
                        body: JSON.stringify({
                           questionContent : data.message,
                        })
                    })
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            window.location.href = `/questions/${data.data.id}`;
                        })
                        .catch((err) => {
                            console.log('Error: ', err);
                            window.alert(err.message);
                        })
                })
            };

            const voteResult = document.getElementById('vote-result');
            if(voteResult){
                voteResult.addEventListener('click', (event) => {
                    event.preventDefault();
                    window.location.href = `/questions/${data.message.id}`;
                })
            }

            const otherQuestion = document.getElementById('other-question');
            if(otherQuestion){
                otherQuestion.addEventListener('click', () => {
                    window.location.href = `/`;
                })
            }
        })
        .catch((error) => {
            console.log('Error: ', error);
            window.alert(error.message);
        })
}