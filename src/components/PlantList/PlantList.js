import React, { useState } from 'react'; 
import Navbar from '../Nav/navbar'; 
import EditPlant from './EditPlant'; 

function PlantList(props) {
    const [render, setRender] = useState(false); 
    const rendered = props.rendered; 
    const [alert, setAlert] = useState({
      classes: '', 
      name: ''
    });

    function removeFeed(nm) { 
      let index = rendered.findIndex(i => i.name === nm); 
      rendered.splice(index, 1); 
      let props = {
        classes: '', 
        messages: nm + " was successfully deleted."
      }; 
      triggerAlert(props); 
      
    }

    function editFeed(doc) {
      rendered[doc.id - 1] = doc; //change id's. 
      let props = { 
        classes: '', 
        message: "Successfully edited " + doc.name + "."
      }
      triggerAlert(props); 
    }
    
    function addFeed(data) { 
      rendered.push(data); 
      setRender(!render); 
    }; 

    function triggerAlert(al) { 
      if (al) {
        setAlert({
          message: al.message, 
          classes: al.classes
      }); 
      console.log(alert); 
      setTimeout(function(){ setAlert({
        message: '', 
        classes: ''
      }); }, 4000);
    }
    }

    return (
      <div>
        <div>
        <Navbar logoutHandler={props.LogoutHandler} length={rendered.length} changeState={addFeed}  /> 
        </div>
        <p className={alert.classes} value={alert}>{alert.message}</p>

      <ul>
        {rendered.map((doc, ind) => 
          <div key={ind} value={doc.id}>
        <img src={doc.photo} alt="" width="500" height="500" />
        <p>name: {doc.name}
          , species: {doc.species}, 
          notes: {doc.notes}, 
          water every {doc.wateringfrequency} days. 
        </p>
        <EditPlant current={doc} onEdit={editFeed} onDelete={removeFeed} /> 
             </div>)}
      </ul>

      </div>
      
    );
 

}; 



export default PlantList;  