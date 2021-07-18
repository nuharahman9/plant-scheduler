import React, { useState } from 'react'; 
import Navbar from '../Nav/navbar'; 
//import db from '../Firebase/db'; 

function PlantList(props) {

    const [render, setRender] = useState(false); 
    const rendered = props.rendered; 

    function setFeed(data) { 
      rendered.push(data); 
      setRender(!render); 
    }

    return (
      <div>
        <Navbar logoutHandler={props.LogoutHandler} length={rendered.length} changeState={setFeed}/> 
      <ul>
        {rendered.map((doc) => 
          <div key={doc.id}>
        <img src={doc.photo} alt=""/> 
        <p>name: {doc.name}
          , species: {doc.species}, 
          notes: {doc.notes}, 
          water every {doc.wateringfrequency} days. 
        </p>
            
             </div>)}
      </ul>

      </div>
      
    );
 

}; 



export default PlantList;  