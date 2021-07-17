import Popup from 'reactjs-popup'; 
import React, { useState } from 'react'; 
import './popup.css'; 
import db from '../Firebase/db'; 
import fire from '../Firebase/config'; 

const AddPlant = (props) => { 
  const [newPlant, setNewPlant] = useState({
    id: props.size,
    name: '',
    species: '',
    lastwatered: '',
    wateringfrequency: '',
    notes: ''

  }); 

  const nameHandler = (e) => {
    setNewPlant({
      ...newPlant, 
      name: e.target.value, 
    })
  }; 
  const speciesHandler = (e) => {
    setNewPlant({
      ...newPlant, 
      species: e.target.value
    })
  }; 
  const notesHandler = (e) => { 
    setNewPlant({
      ...newPlant, 
      notes: e.target.value
    })
  }; 
  const dateHandler = (e) => { 
    setNewPlant({
      ...newPlant, 
      lastwatered: e.target.value
    })
  }
  const frequencyHandler = (e) => {
    setNewPlant({
      ...newPlant, 
      wateringfrequency: e.target.value
    })
  }

  const clearFields = () => { 
    setNewPlant({
      name: '', 
      species: '', 
      lastwatered: '',
      wateringfrequency: '',
      notes: '',
      id: ''
    }); 
  }


  async function addPlant() { 
    let uid = fire.auth().currentUser.uid; 
    const user =  db.collection('users').doc(uid);
    await user.collection('plants').doc(newPlant.id.toString()).set(newPlant); 
    clearFields(); 

  }
  //don't forget image field 

  return (  
    <Popup
    trigger={<button className="button">+ new Plant </button>}
    modal>
    {close => (
      <div className="popup">
        <a className="close" onClick={ (e) => {
          e.preventDefault(); 
          clearFields(); 
          close(); 
        }} href="/"> 
          &times;
        </a>
        <div className="header">Add Plant</div>
        <div className="content">
          {" "}
          <form onSubmit={(e) => { 
            e.preventDefault(); 
            addPlant(e); 
            close();
          } 
          }>
            <input placeholder="Name" id="name" onBlur={nameHandler}/>
            <input placeholder="Species" id="species" onBlur={speciesHandler}/>
             <input type="date" placeholder="Date last watered" id="date" onBlur={dateHandler}/> 
             <input type="number" placeholder="Watering frequency" id="frequency" onBlur={frequencyHandler}/> 
             <input placeholder="notes" id="notes" onBlur={notesHandler} /> 
        
             <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )}
  </Popup>
  )



}; 


export default AddPlant; 