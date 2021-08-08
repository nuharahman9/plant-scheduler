import Popup from 'reactjs-popup'; 
import React, { useState } from 'react'; 
import './popup.css'; 
import './navbar.css'; 
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
      id: '',
      species: '', 
      lastwatered: '', 
      nextwatering: '', 
      wateringfrequency: '',
      notes: '',
      photo: ''
    }); 
    setFile(null); 
  }

  async function uploadPlant(prop) { 
    let uid = fire.auth().currentUser.uid;
    const user =  db.collection('users').doc(uid);
    let newPlantRef = user.collection("plants").doc(); 
      const plant = { 
        wateringfrequency: newPlant.wateringfrequency, 
        photo: prop, 
        notes: newPlant.notes, 
        name: newPlant.name, 
        id: newPlantRef.id, 
        nextwatering: 0, 
        species: newPlant.species, 
        lastwatered: newPlant.lastwatered
      }; 
    await newPlantRef.set(plant).then(() => {
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
    trigger={<button className="navbutton">new plant</button>}
    modal>
    {close => (
      <div className="overlay">
        <div className="box">
        <a id="close" onClick={ (e) => {
          e.preventDefault(); 
          clearFields(); 
          close(); 
        }} href="/"> 
          &times;
        </a>
        <div>
          <h1 className="header">new plant</h1>
          {" "}
          <form className="content" onSubmit={(e) => { 
            e.preventDefault(); 
             addPlant(); 
            close();
          } 
          }>
            <label for="name"> Name: </label>
            <input placeholder="Name" id="name" className="fields" onBlur={nameHandler}/><br/>
            <label for="species">Species: </label>
            <input placeholder="Species" id="species" className="fields" onBlur={speciesHandler}/><br/>
            <label for="date">The last day you watered it: </label>
             <input type="date" placeholder="Date last watered" id="date" className="fields" onChange={dateHandler} required/> <br/>
             <label for="frequency">How often should we remind you?</label> <br/>
             <label for="frequency">
               Every 
               <input type="number" min="1" className="fields" id="frequency" onBlur={frequencyHandler} required/> 
               day(s).
             </label><br/>
             <label for ="notes"> Anything else to remember? </label><br/>  
              <textarea className="fields" id="notes" onBlur={notesHandler} />
              <br/>
             <label for="photo"> Upload Icon </label>
              <input type="file" id="photo" onChange={fileHandler}/>
             <button type="submit">submit</button>
          </form>
        </div>
        </div>
      </div>
    )}
  </Popup>
  )



}; 


export default AddPlant; 