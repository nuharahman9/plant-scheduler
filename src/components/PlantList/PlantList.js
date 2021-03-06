import React, { useState, useEffect } from 'react'; 
import Navbar from '../Nav/navbar'; 
import EditPlant from './EditPlant'; 

function PlantList(props) {
    const [render, setRender] = useState(false); 
    const [empty, setEmpty] = useState(false); 
    const [alert, setAlert] = useState({
      classes: '', 
      name: ''
    });
    let rendered = props.rendered; 

    function updateWatering(doc, ind) { 
        const msec = Date.parse(doc.lastwatered) + (doc.wateringfrequency * 86400000); 
        const offset = new Date().getTimezoneOffset() * 60000; 
        let nextwater = (Math.ceil(( (msec) - (Date.now()) + offset) / 86400000)); 
        doc = { 
          ...doc, 
          nextwatering: nextwater
        }; 
        rendered[ind] = doc; 
        setRender(!render); 
    }

    function removeFeed(id, name) { 
      let props = {
        classes: 'alert', 
        messages: name + " was successfully deleted."
      }; 
      triggerAlert(props); 
      let index = rendered.findIndex(i => i.id === id); 
      rendered.splice(index, 1); 
      if (rendered.length === 0) { 
        rendered.push(0); 
        setEmpty(true); 
      } else {
        setEmpty(false); 
      }
    }

    function editFeed(doc, index) {
      updateWatering(doc, index); 
      let props = { 
        classes: 'alert', 
        message: "Saved changes to " + doc.name + "."
      }
      triggerAlert(props); 
    }
    
    function addFeed(data) { 
      if (rendered[0] === 0) {
        rendered.splice(0, 1); 
      }
      rendered.push(data); 
      updateWatering(data, (rendered.length - 1)); 
      let props = { 
        classes: 'alert', 
        message: "Successfully added " + data.name + "."
      }
      triggerAlert(props); 
      setEmpty(false); 
    }; 

    function triggerAlert(al) { 
      if (al) {
        setAlert({
          message: al.message, 
          classes: al.classes
      }); 
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
       return <p>Your next watering is in {props.num.toString()} days.</p>
      }
    }; 

    useEffect(() => {
      if (rendered[0] === 0 || rendered.empty) { 
        setEmpty(true); 
      } else {
        setEmpty(false); 
      }
    }, [rendered]); 

   
    return (
      <div>
        <div>
        <Navbar logoutHandler={props.LogoutHandler} length={rendered.length} changeState={addFeed}  /> 
        </div>
        <p className={alert.classes} value={alert}>{alert.message}</p>

      <div id="list" value={empty}>
        {!empty ? (
            rendered.map((doc, ind) => 
            <div key={ind} value={doc} className="card"> 
            <img src={doc.photo} alt="" width="500" height="500" className="photo"/>
            <p>{doc.name} </p>
            <p>
            last watered on {doc.lastwatered}
            </p>
            {(doc.species !== '') ? (
              <p>
                species: {doc.species} </p>
            ) : (null)}
            {(doc.notes !== '') ? (
              <p>
                additional notes: {doc.notes}
              </p>
            ): (null)}
            <WateringAlert num={parseInt(doc.nextwatering)} value={doc.nextwatering}></WateringAlert>
            <EditPlant current={doc} onEdit={editFeed} onDelete={removeFeed} index={ind} className="edit"/> 
              </div>)
          
        ) : ( 
          <h1 className="new-plant"> click 'neW plAnt' to Get started. </h1>
        )}
 
      </div>
      </div>
      
    );

}; 


export default PlantList;  