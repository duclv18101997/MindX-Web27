window.onload = () => {
    let isLoading;
    let timeOut = null;
    document.getElementById('search').addEventListener('input', (event) => {
        event.preventDefault();
        clearTimeout(timeOut);
        //set timeout
        timeOut = setTimeout(() => {
            //spinner
            const spinner = document.getElementById('spinner');
            spinner.display = 'flex';
            //get key word
            const searchWord = document.getElementById('keyword');
            const keyWord = searchWord.value;
            const resultList = document.getElementById('result-list');
            fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${keyWord}&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`, {
                method: 'GET'
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    isLoading = data.nextPageToken;
                    spinner.style.display = 'none';
                    resultList.innerHTML = ``;
                    if (data.items.length == 0) {
                        resultList.innerHTML = ``;
                        resultList.innerHTML = `
                    <div class="error">
                    <p>Rất tiếc, không có kết quả nào cho video: ${keyWord}</p>
                    </div>
                    `;
                    } else {
                        data.items.forEach((element) => {
                            resultList.insertAdjacentHTML('beforeend', `
                        <a class='result col-md-12' href='https://www.youtube.com/watch?v=${element.id.videoId}' target='_blank'>
                        <div class='row'>
                            <div class='col-4'>
                                <img src='${element.snippet.thumbnails.default.url}' />
                            </div>
                            <div class='col-8'>
                                <div class='video-info'>
                                    <h2 class='title'>${element.snippet.title}</h2>
                                    <p class='description'>${element.snippet.description}</p>
                                    <span class='viewVideo'>View >></span>
                                </div>
                            </div>
                        </div>
                        </a>
                            `);
                        });
                        let flag = true;

                        window.addEventListener('scroll', () => {
                            if (document.documentElement.offsetHeight - window.innerHeight - window.scrollY <= 200 && flag) {
                                flag = false;

                                fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=chipu&type=video&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${isLoading}`, {
                                    method: 'GET'
                                })
                                    .then((response) => {
                                        return response.json();
                                    })
                                    .then((data) => {
                                        console.log(data);
                                        isLoading = data.nextPageToken;
                                        const resultList = document.getElementById('result-list');
                                        data.items.forEach((element) => {
                                            resultList.insertAdjacentHTML('beforeend', `
                                                    <a class='result col-md-12' href='https://www.youtube.com/watch?v=${element.id.videoId}' target='_blank'>
                                                    <div class='row'>
                                                        <div class='col-4'>
                                                            <img src='${element.snippet.thumbnails.default.url}' />
                                                        </div>
                                                        <div class='col-8'>
                                                            <div class='video-info'>
                                                                <h2 class='title'>${element.snippet.title}</h2>
                                                                <p class='description'>${element.snippet.description}</p>
                                                                <span>View >></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                     </a>
                                            `);
                                        });
                                    }).then(() => {
                                        flag = true;
                                    });
                            }
                        })
                    }
                })
                .catch((error) => {
                    console.log(error);
                    window.alert(error.message);
                });

        }, 1000);

    });

}