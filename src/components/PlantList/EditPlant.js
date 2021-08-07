import Popup from 'reactjs-popup'; 
import React, { useState } from 'react'; 
import db from '../Firebase/db'; 
import './PlantList.css'; 
import fire, { storage } from '../Firebase/config'; 

const EditPlant = (props) => {
  const [plant, setPlant] = useState({
    id: props.current.id, 
    name: props.current.name,
    species: props.current.species,
    lastWatered: props.current.lastwatered,
    wateringFrequency: props.current.wateringfrequency,
    notes: props.current.notes
  }); 

  const [file, setFile] = useState(null); 
  const [del, setDel] = useState(false); 
  let url = props.current.photo; 
  const defaultImg = "https://firebasestorage.googleapis.com/v0/b/plant-scheduler.appspot.com/o/default.jpeg?alt=media&token=47cdb8dd-d74c-4100-9f30-f8647d10096e"; 
  const uid = fire.auth().currentUser.uid;

  const nameHandler = (e) => {
    if (plant.name !== e.target.value && e.target.value !== null) { 
      setPlant({
        ...plant, 
        name: e.target.value
      })
    }
  };
  const speciesHandler = (e) => {
    if (plant.species !== e.target.value && e.target.value !== null) { 
      setPlant({
        ...plant, 
        species: e.target.value
      })
    }
  }; 
  const dateHandler = (e) => {
    if (plant.lastWatered !== e.target.value && e.target.value !== null) { 
      setPlant({
        ...plant, 
        lastWatered: e.target.value
      });
    }
  }; 

  const notesHandler = (e) => {
    if (plant.notes !== e.target.value && e.target.value !== null) { 
      setPlant({
        ...plant, 
        notes: e.target.value
      })
    }
  }; 
  const fileHandler = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]); 
    }

   }; 

  const frequencyHandler = (e) => {
    if (plant.wateringFrequency !== e.target.value && e.target.value !== null) { 
      setPlant({
        ...plant, 
        name: e.target.value
      })
    }
  }; 
  const deleteHandler = () => { 
    setDel(!del); 
  }; 

  function clearFields() { 
   // setPlant({
     // id: '',
     // name: '',
     // species: '',
     // lastWatered: '',
     // wateringFrequency: '',
     // notes: '',
     // photo: ''
   // })
   // setFile(null);  
     setDel(false); 
   }; 

  function edit() { 
    if (del) { 
      deletePlant(); 
    }
    else if (file) { 
      fileUpload(); 
    }
    else { 
      uploadEdit(url); 
    }
  }

  async function deleteImg() { 
    const imageRef = storage.refFromURL(url); 
    imageRef.delete().catch(err => { console.log(err)}); 
  }

  async function deletePlant() { 
    console.log('delete'); 
    const user =  db.collection('users').doc(uid); 
    await user.collection('plants').doc(props.current.id.toString()).delete().then(() => {
      if (url !== defaultImg) { 
        deleteImg(); 
      } 
      props.onDelete(props.current.id, props.current.name); 
  
      }); 
  };   

  const fileUpload = () => {
    const uploadTask = storage.ref().child(file.name).put(file);
    uploadTask.on('state_changed',  
      snapshot => {}, 
      (error) => {
        console.log(error); 
      }, 
      () => {
        storage.ref().child(file.name).getDownloadURL().then( url => {
          uploadEdit(url);    
        })
      }
    )
  }; 


  async function uploadEdit(link) {
    const user =  db.collection('users').doc(uid);
    const plantRef = user.collection('plants').doc(plant.id.toString()); 
    const doc = { //make this more efficient?? 
      name: plant.name, 
      species: plant.species, 
      lastwatered: plant.lastWatered, 
      nextwatering: 0, 
      notes: plant.notes, 
      photo: link,
      wateringfrequency: plant.wateringFrequency
    }

    plantRef.set(doc, { merge: true }).then(() => {
      clearFields(); 
      props.onEdit(doc, props.index); 
    }); 
     
  }


  return (  
    <Popup
    trigger={<button className="edit">edit info </button>}
    modal nested>
    {close => (
      <div className="popup">
        <a className="close" onClick={ (e) => {
          e.preventDefault(); 
          clearFields(); 
          close(); 
        }} href="/"> 
          &times;
        </a>
      <div className="header">Edit {props.current.name} </div>
        <div className="content">
          {" "}
          <form onSubmit={(e) => { 
            e.preventDefault();
             edit(); 
            close();
          } 
          }>
            <input defaultValue={plant.name} id="name" onBlur={nameHandler}/>
            <input defaultValue={plant.species} id="species" onBlur={speciesHandler}/>
             <input type="date" defaultValue={plant.lastWatered} id="date" onBlur={dateHandler}/> 
             <input type="number" defaultValue={plant.frequency} id="frequency" onBlur={frequencyHandler}/> 
             <input defaultValue={plant.notes} id="notes" onBlur={notesHandler} /> 
             <input type="file" placeholder="Upload Photo"  onBlur={fileHandler} />
             <input type="checkbox" onClick={deleteHandler} id="deleted" name="deleted"/> 
              <label htmlFor="deleted"> Delete Plant </label>
             <p id="error">
             </p>
             <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    )}
  </Popup>
  )



}; 


export default EditPlant; 