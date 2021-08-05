import Popup from 'reactjs-popup'; 
import React, { useState } from 'react'; 
import './popup.css'; 
import db from '../Firebase/db'; 
import fire, { storage } from '../Firebase/config'; 

const AddPlant = (props) => { 
  const [newPlant, setNewPlant] = useState({
    id: '',
    name: '',
    species: '',
    lastwatered: '',
    wateringfrequency: -1,
    notes: '',
  }); 
  
  const [file, setFile] = useState(null); 

  const nameHandler = (e) => {
    setNewPlant({
      ...newPlant, 
      name: e.target.value, 
      id: props.size
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
    });

  }; 
  const frequencyHandler = (e) => {
    setNewPlant({
      ...newPlant, 
      wateringfrequency: e.target.value
    })
  }; 
  const fileHandler = (e) => { 
    if (e.target.files[0]) {
      setFile(e.target.files[0]); 
    }
  }; 



  const clearFields = () => { 
    setNewPlant({
      name: '', 
      species: '', 
      lastwatered: '', 
      nextwatering: '', 
      wateringfrequency: '',
      notes: '',
      id: '',
      photo: ''
    }); 
    setFile(null); 
  }

  async function uploadPlant(prop) { 
      const plant = { 
        wateringfrequency: newPlant.wateringfrequency, 
        photo: prop, 
        notes: newPlant.notes, 
        name: newPlant.name, 
        id: newPlant.id, 
        nextwatering: 0, 
        species: newPlant.species, 
        lastwatered: newPlant.lastwatered
      }
    let uid = fire.auth().currentUser.uid;
    const user =  db.collection('users').doc(uid);
    await user.collection('plants').doc(newPlant.id.toString()).set(plant).then(() => {
     props.onNewPlant(plant); 
    });  
  
  }

  const fileUpload = () => {
    const uploadTask = storage.ref().child(file.name).put(file);
    uploadTask.on('state_changed',  
      snapshot => {}, 
      (error) => {
        console.log(error); 
      }, 
      () => {
        storage.ref().child(file.name).getDownloadURL().then( url => {
          uploadPlant(url); 
        })
      }
    )
  }; 


   function addPlant() { 
     if (file !== null) { 
       fileUpload(); 
     } else { 
      let defaultImg = "https://firebasestorage.googleapis.com/v0/b/plant-scheduler.appspot.com/o/default.jpeg?alt=media&token=47cdb8dd-d74c-4100-9f30-f8647d10096e"; 
       uploadPlant(defaultImg); 
     }
  }

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
             addPlant(); 
            close();
          } 
          }>
            <input placeholder="Name" id="name" onBlur={nameHandler}/>
            <input placeholder="Species" id="species" onBlur={speciesHandler}/>
             <input type="date" placeholder="Date last watered" id="date" onChange={dateHandler}/> 
             <input type="number" placeholder="Watering frequency" id="frequency" onBlur={frequencyHandler}/> 
             <input placeholder="notes" id="notes" onBlur={notesHandler} /> 
              <input type="file" onChange={fileHandler}/>
             <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )}
  </Popup>
  )



}; 


export default AddPlant; 