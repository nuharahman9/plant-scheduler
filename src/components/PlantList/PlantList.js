import React, { useState } from 'react'; 
import Navbar from '../Nav/navbar'; 
//import db from '../Firebase/db'; 
import EditPlant from './EditPlant'; 

function PlantList(props) {

    const [render, setRender] = useState(false); 
    const rendered = props.rendered; 
    function removeFeed(name) { 
      let index = rendered.findIndex(i => i.name === name); 
      rendered.splice(index, 1); 
      setRender(!render); 
    }

    function editFeed(doc) {
      rendered[doc.id - 1] = doc; //change id's. 
      setRender(!render); 
    }
    function setFeed(data) { 
      rendered.push(data); 
      setRender(!render); 
    }; 


    return (
      <div>
        <Navbar logoutHandler={props.LogoutHandler} length={rendered.length} changeState={setFeed}/> 
      <ul>
        {rendered.map((doc, ind) => 
          <div key={ind} value={doc.id}>
        <img src={doc.photo} alt="" width="500" height="500" />
        <p>name: {doc.name}
          , species: {doc.species}, 
          notes: {doc.notes}, 
          water every {doc.wateringfrequency} days. 
        </p>
        <EditPlant current={doc} onEdit={editFeed} onDelete={removeFeed}/> 
             </div>)}
      </ul>

      </div>
      
    );
 

}; 



export default PlantList;  