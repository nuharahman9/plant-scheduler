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
    wateringfrequency: '',
    notes: '',
    photo: ''

  }); 

  const [file, setFile] = useState(null); 
  const storageRef = storage.ref(); 

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
    })
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
  }

  const clearFields = () => { 
    setNewPlant({
      name: '', 
      species: '', 
      lastwatered: '',
      wateringfrequency: '',
      notes: '',
      id: '',
      photo: ''
    }); 
    setFile(null); 
  }

  async function uploadFile() { 
    console.log('upload');
    const fileRef = storageRef.child(file.name); 
    fileRef.put(file).then(() => {  
      storageRef.child(file.name).getDownloadURL().then(url => {
        console.log(url)
        setNewPlant({
          ...newPlant, 
          photo: url
        })
        addPlant(); 
      }).catch((err) => {
        console.log(err); 
      });
    })

  }


  async function addPlant() { 
    console.log(newPlant); 
    let uid = fire.auth().currentUser.uid;
    const user =  db.collection('users').doc(uid);
    await user.collection('plants').doc(newPlant.id.toString()).set(newPlant); 
    props.onNewPlant(newPlant); 

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
            uploadFile(); 
         //   addPlant(); 
            close();
          } 
          }>
            <input placeholder="Name" id="name" onBlur={nameHandler}/>
            <input placeholder="Species" id="species" onBlur={speciesHandler}/>
             <input type="date" placeholder="Date last watered" id="date" onBlur={dateHandler}/> 
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