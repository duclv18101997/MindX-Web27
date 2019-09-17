import React, { Component } from 'react';
import { async } from 'q';

const maxFileSize = 5000000;
const imgRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
class Post extends Component {
    state = {
        content: '',
        imgUrl: '',
        file: undefined,
        errorMessage: '',
    }

    handleTextChange = (event) => {
        this.setState({
            content: event.target.value,
        })
    }


    handleImageChange = (event) => {
        const fileName = event.target.files[0];
        if (fileName) {
            //validate
            if (!imgRegex.test(fileName.name)) {
                this.setState({
                    errorMessage: 'Invalid file type'
                })
            } else if (fileName.size > maxFileSize) {
                this.setState({
                    errorMessage: 'File too large'
                })
            } else {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(fileName);
                fileReader.onload = () => {
                    //fileReader.result
                    this.setState({
                        file: fileName,
                        errorMessage: '',
                        imgUrl: fileReader.result,
                    });
                };
            }
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        //validate
        if(!this.state.imgUrl){
            this.setState({
                errorMessage: "Input file"
            })
        }else if(!this.state.content){
            this.setState({
                errorMessage: "input content"
            })
        }else{
            this.setState({
                errorMessage: ''
            });

            //fetch lay imgurl
            try{
                const formData = new FormData();
                formData.append('image', this.state.file);   //gan file vao fromdata
                const uploadResult = await fetch(`http://localhost:3001/upload/photos`, {
                method: 'POST',
                body: formData

                }).then(res => {return res.json();})
                console.log(uploadResult);
                //create new post
                await fetch(`http://localhost:3001/posts/create`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        content: this.state.content,
                        imgUrl: uploadResult.data,
                    })
                }).then(res => {return res.json();})
               window.location.href = `/`;
            }catch(err){
                this.setState({
                    errorMessage: err.message
                })
            }
        }
           
    }
    render() {
        return (
            <div className='container back-ground'>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '30px', marginTop: '30px' }}>
                        <label style={{ marginTop: '50px' }} htmlFor="exampleFormControlFile1">Images<span className="text-danger">*</span>: </label>
                        <input type="file" className="form-control-file" id="exampleFormControlFile1"
                            filename={this.state.file ? this.state.file.name : null}
                            onChange={this.handleImageChange}
                        />
                    </div>
                    {this.state.imgUrl ? (
                        <div style={{
                            backgroundImage: `url(${this.state.imgUrl})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: 'cover',
                            width: '50%',
                            height: "400px",
                            marginBottom: "20px"
                        }}>
                        </div>
                    ) : null
                    }

                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Description<span className="text-danger">*</span>:</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                            placeholder="Description..."
                            value={this.state.content}
                            onChange={this.handleTextChange}
                        ></textarea>
                    </div>

                    {this.state.errorMessage ? (
                        <div className="alert alert-danger" role="alert">
                            {this.state.errorMessage}
                        </div>
                    ) : null
                    }
                    <div>
                        <input type="submit" value="Create" className="btn btn-primary" />
                    </div>
                    {/* <button type="button" className="btn btn-primary">Upload</button> */}
                </form>
            </div>
        );
    }
}

export default Post;