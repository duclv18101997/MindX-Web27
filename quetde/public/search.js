window.onload = () => {
    document.querySelector('.search').addEventListener('submit', (event) => {
        event.preventDefault();
        // get keyword
        const searchKeyword = document.querySelector('.search-input').value;

        // fetch to server
        fetch(`/search-question?keyword=${searchKeyword}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                const resultElement = document.querySelector('.search-result');

                if (data.data.length === 0) {
                    resultElement.innerHTML = '';

                    resultElement.insertAdjacentHTML('beforeend', `
                        <div class = 'error'>
                        No question found
                        </div>
            `);
                } else {
                    resultElement.innerHTML = `
                    <table class="table-form">
                    <thead class='table-head'>
                        <tr>
                            <th>Content</th>
                            <th>Like</th>
                            <th>Dislike</th>
                        </tr>
                    </thead>
                    <tbody class="question-result">

                    </tbody>
                    </table>
                    `;
                    for (const item of data.data) {
                        const result = `
                            <tr>
                            <td >${item.content}</td>
                            <td >${item.like}</td>
                            <td >${item.dislike}</td>
                            </tr>
            `;
                        document.querySelector('.question-result').insertAdjacentHTML('beforeend', result);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                window.alert(error.message);
            });
    });
};