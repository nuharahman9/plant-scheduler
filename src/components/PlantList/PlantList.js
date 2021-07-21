import React, { useState } from 'react'; 
import Navbar from '../Nav/navbar'; 
import EditPlant from './EditPlant'; 

function PlantList(props) {
    const [render, setRender] = useState(false); 
    const [alert, setAlert] = useState({
      classes: '', 
      name: ''
    });
    let rendered = props.rendered; 

    function updateWatering(doc, ind) { 
        const msec = Date.parse(doc.lastwatered) + (doc.wateringfrequency * 86400000); 
        const offset = new Date().getTimezoneOffset() * 60000; 
        let nextwater = (Math.ceil(( (msec) - (Date.now()) + offset) / 86400000)); 
        console.log(nextwater); 
        doc = { 
          ...doc, 
          nextwatering: nextwater
        }; 
        rendered[ind] = doc; 
        setRender(!render); 
    }

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
      updateWatering(doc, doc.id - 1); 
      let props = { 
        classes: '', 
        message: "Saved changes to " + doc.name + "."
      }
      triggerAlert(props); 
    }
    
    function addFeed(data) { 
      rendered.push(data); 
      updateWatering(data, (rendered.length - 1)); 
      let props = { 
        classes: '', 
        message: "Successfully added " + data.name + "."
      }
      triggerAlert(props); 
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
    }; 

    function WateringAlert(props) {
      if (props.num === 0) { 
        return <p>just in time! make sure to water that thang today girl</p>
      } else if (props.num < 0) { 
        if (props.num === -1) { return <p>Fuck bro ur killing ur plant!!! it's been like {props.num.toString() * -1} day! go!</p>}
        return <p>Fuck bro ur killing ur plant!!! it's been like {props.num.toString() * -1} days! go!</p>
      } else if (props.num === 1) { 
        return <p>You next watering is tomorrow.</p>
      }
       else { 
       return <p>Your next watering is in ${props.num.toString()} days.</p>
      }
    }; 


    return (
      <div value={rendered}>
        <div>
        <Navbar logoutHandler={props.LogoutHandler} length={rendered.length} changeState={addFeed}  /> 
        </div>
        <p className={alert.classes} value={alert}>{alert.message}</p>

      <ul>
        {rendered.map((doc, ind) => 
          <div key={ind} value={doc}>
        <img src={doc.photo} alt="" width="500" height="500" />
        <p>name: {doc.name}
          , species: {doc.species}, 
          notes: {doc.notes}, 
          last watered on {doc.lastwatered}; 
        </p>
        <WateringAlert num={parseInt(doc.nextwatering)} value={doc.nextwatering}></WateringAlert>
        <EditPlant current={doc} onEdit={editFeed} onDelete={removeFeed} /> 
             </div>)}
      </ul>

      </div>
      
    );
 

}; 



export default PlantList;  