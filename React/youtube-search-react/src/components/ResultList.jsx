import React from 'react';

const ResultList = (props) => {
    return (
        <a className='result col-md-12' href={'https://www.youtube.com/watch?v='+ props.videoId} target='_blank'>
            <div className='row'>
                <div className='col-4'>
                    <img src= {props.imgUrl} />
                </div>
                <div className='col-8'>
                    <div className='video-info'>
                        <h2 className='title'>{props.title}</h2>
                        <p className='description'>{props.description}</p>
                        <span>View >></span>
                    </div>
                </div>
            </div>
        </a>
        
    )
}

export default ResultList;