import React, { Component } from 'react';

class HomePage extends Component {
    state = {
        posts: [],
        pageNumber: 1,
        pageSize: 3,
        total: 0,
        isModalOpen: false
    }

    componentDidMount() {
        //fetch 
        fetch(`http://localhost:3001/posts/get/post?pageNumber=${this.state.pageNumber}&pageSize=${this.state.pageSize}`, {
            method: 'GET',
        })
            .then((res) => {
                return res.json();

            })
            .then((data) => {
                console.log(data);
                this.setState({
                    posts: data.data,
                    total: data.total
                })
            })
    }

    handleClickPage = (event) => {
        this.setState({
            pageNumber: event.target.innerText,
        })
        //fetch lai
        fetch(`http://localhost:3001/posts/get/post?pageNumber=${event.target.innerText}&pageSize=${this.state.pageSize}`, {
            method: 'GET',
        })
            .then((res) => {
                return res.json();

            })
            .then((data) => {
                console.log(data);
                this.setState({
                    posts: data.data,
                    total: data.total
                })
            })
    }

    handleCard = () => {
     this.setState({
         isModalOpen: true
     })
    }


    render() {
        const postArr = [];
        for (let i = 1; i <= Math.ceil(this.state.total / this.state.pageSize); i++) {
            postArr.push(i);
        }
        return (
            <div>
                <div className="card-container" >
                    {this.state.posts.map((value) => {
                        return (
                           
                            <div onClick={this.handleCard} className="card" key={value._id} style={{ width: '20rem', height: '30rem' }}>
                                <img src={value.imgUrl} alt="" style={{
                                    backgroundSize: "cover",
                                    height: "300px"
                                }} />
                                <div className="card-body">
                                    <div className="user-descript">
                                        <div className="avatar" style={{ backgroundColor: "#70e0b7", color: "white" }}>
                                            {value.author.fullName.split(" ")[value.author.fullName.split(" ").length - 1]}
                                        </div>
                                        <div className="user-infor" style={{ marginTop: "20px" }}>
                                            <div className="user-name" style={{ fontWeight: "bold" }}>
                                                {value.author.fullName}
                                            </div>
                                            <div className="user-email">
                                                {value.author.email}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="card-text">{value.content}</p>
                                </div>
                            </div>

                        )
                    })}
                </div>

                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                        </li>
                        {postArr.map((value) => {
                            return (
                                <li className="page-item"><a className="page-link" onClick={this.handleClickPage}>{value}</a></li>
                            )
                        })}


                        <li className="page-item">
                            <a className="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>

        );
    }
}

export default HomePage;