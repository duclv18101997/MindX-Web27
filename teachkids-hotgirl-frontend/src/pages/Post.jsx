import React, { Component } from 'react';

class Post extends Component {
    state = {
        content: '',
        imgUrl: '',
    }

    handleTextChange = (event) => {
        this.setState({
            content: event.target.value,
        })
    }

    handleImageChange = (event) => {
        this.setState({
            imgUrl: event.target.value,
        })
        console.log(this.state.imgUrl);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //fetch
        
    }
    render() {
        return (
            <div className='container back-ground'>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group" style={{marginBottom:'30px',marginTop:'30px'}}>
                        <label style={{marginTop:'50px' }} htmlFor="exampleFormControlFile1">Chọn ảnh hot-girl: </label>
                        <input type="file" className="form-control-file" id="exampleFormControlFile1" 
                        onChange={this.handleImageChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Bạn muốn mô tả gì về cô gái này:</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                        value={this.state.content}
                        onChange={this.handleTextChange}
                        ></textarea>
                    </div>
                    <button type="button" className="btn btn-primary">Upload</button>
                </form>
            </div>
        );
    }
}

export default Post;