window.onload = () => {
    fetch('/get-random-question')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        document.querySelector('.question-content').innerHTML = data.data.content;
  
        // listen buttons click
        document.getElementById('like').addEventListener('click', () => {
          voteQuestion(data.data.id, 'like');
        });
        document.getElementById('dislike').addEventListener('click', () => {
          voteQuestion(data.data.id, 'dislike');
        });
        document.getElementById('vote-result').addEventListener('click', () => {
          window.location.href = `/questions/${data.data.id}`;
        });
        document.getElementById('other-question').addEventListener('click', () => {
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.message);
      });
  };
  
  const voteQuestion = (questionId, selectedVote) => {
    fetch(`/save-vote`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questionId: questionId,
        selectedVote: selectedVote,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        window.location.href = `/questions/${questionId}`;
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.message);
      });
  };