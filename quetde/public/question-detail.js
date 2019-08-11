

window.onload = () => {
    //logic
    //fetch API get question
    const pathname = window.location.pathname;
    const pathNameParts = pathname.split('/');
    const questionId = pathNameParts[pathNameParts.length -1 ];

    let questionContent = document.querySelector('.question-content');
    let voteNumber = document.querySelector('.vote-number');
    let like = document.querySelector('.like');
    let dislike = document.querySelector('.dislike');
    
    
    fetch(`/get-question-by-id?questionId=${questionId}`,{
        method: 'GET',
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
      //   const questionContent = data.questionContent;
        console.log(data);
        if(questionContent){
            questionContent.innerHTML = data.data.content;
           
        }

        const countLike = data.data.like;
        const countDislike = data.data.dislike;
        if (voteNumber) {
            voteNumber.innerHTML = countLike + countDislike ;
        }
        if (dislike && like) {
            if (countLike == 0 && countDislike == 0) {
                dislike.innerHTML = '50%';
                like.innerHTML = '50%';
            }else{
                dislike.innerHTML = (countDislike/(countDislike + countLike) * 100).toPrecision(3) + '%';
                dislike.style.width = countDislike/(countDislike + countLike)*100 + '%';
                like.innerHTML = (countLike/(countDislike + countLike) * 100).toPrecision(3) + '%';
                like.style.width = countLike/(countDislike + countLike)*100 + '%';
            }
        }

        
    })
    .catch((error) => {
        console.log('Error: ',error);
        window.alert(error.message);
    });

    const otherQuestion = document.getElementById('btn');
        if(otherQuestion){
            otherQuestion.addEventListener('click', (event) => {
                event.preventDefault();
                window.location.href = `/`;
            })
        }

    //innerhtml, innertext 
};