
import React from 'react'; 

function Plant (props) { 

    return (
      <div>
        <p>{props.name}</p>
        <p>{props.wateringfrequency}</p>
        <p>{props.lastwatered}</p>
        <p>{props.species}</p>
        <p>{props.photo}</p>
        <p>{props.notes}</p>

      </div>

    ); 
}; 

export default Plant; 