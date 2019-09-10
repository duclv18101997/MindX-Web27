import React from 'react';

const ShowScore = (props) => {
  return (
    <tr>
      <th scope="row">Round {props.index + 1}</th>
      <td>
        <input type="text" className="form-control playerA" name="scorePlayerA"
          value={props.value1}
          onChange={
            (event) => {
              props.inputChange(event, props.scores1, props.index, 'scores1', 'playerA');
            }
          }
        />
      </td>
      <td>
        <input type="text" className="form-control playerB" name="scorePlayerB"
          value={props.value2}
          onChange={
            (event) => {
              props.inputChange(event, props.scores2, props.index, 'scores2', 'playerB');
            }
          }
        />
      </td>
      <td>
        <input type="text" className="form-control playerC" name="scorePlayerC"
          value={props.value3}
          onChange={
            (event) => {
              props.inputChange(event, props.scores3, props.index, 'scores3', 'playerC');
            }
          } 
        />
      </td>
      <td>
        <input type="text" className="form-control playerD" name="scorePlayerD"
          value={props.value4}
          onChange={
            (event) => {
              props.inputChange(event, props.scores4, props.index, 'scores4', 'playerD');
            }
          }
        />
      </td>
    </tr>
  );
};

export default ShowScore;