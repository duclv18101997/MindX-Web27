window.onload = () => {
    //logic
    const countWord = document.querySelector('.count-word');
    const textAreaContent = document.querySelector('.question-content');
    if(textAreaContent){
        textAreaContent.addEventListener('input', () => {
            if(textAreaContent.value.length <= 200){
                 countWord.innerHTML = 200 - textAreaContent.value.length;
            }
           
        })
    }


    const submitButton = document.querySelector('.submit-button');
    if(submitButton){
        submitButton.addEventListener('click', (event) => {
            event.preventDefault();
            const textareaValue = document.querySelector('.question-content').value; 
            //send request to server
            // 1. create new question 2. send question content
            //cần truyền vào fetch 2 thông tin: địa chỉ muốn gửi request và object(option)
            fetch('/create-question',{
                method:'POST',    //body chỉ có khi gửi POST hoặc PUSH
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    questionContent: textareaValue,
                })
            })                 
            .then((response) => {
                //response.json()   -> chỉ dùng khi server trả về json
                //response.text -> chỉ dùng khi server trả về string
                return response.json();
            })
            .then((data) => {    //biến data là kết quả trả về của thằng response bên trên
                //handle response data
                //redirect
                window.location.href = `/questions/${data.data.id}`;
            })
            .catch((error) => {
                console.log('Error: ',error);
                window.alert(error.message);
            });
        })
    }

}