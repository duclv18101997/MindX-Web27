import React from 'react';

const TodoItem = (props) => {

    const handleDoneClick = (event) => {
        props.updateTodoItem(props.itemIndex);
    }

    const handleDeleteClick = (event) => {
        props.deleteTodoItem(props.itemIndex);
    }

    return (
        <div className='mt-2' >
            {props.finished ? <strike className='mr-3'>{props.value}</strike> :  <span className='mr-3'>{props.value}</span>}
                <button className='btn btn-success mr-3' onClick={handleDoneClick}>
                    Done
                    </button>
                <button className='btn btn-danger' onClick={handleDeleteClick}>
                    Delete
                    </button>
              </div>
    );
  
}

export default TodoItem;