import Popup from 'reactjs-popup'; 
import React, { useState } from 'react'; 
import db from '../Firebase/db'; 
import './PlantList.css'; 
import '../Nav/popup.css'; 
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
  const defaultImg = "https://firebasestorage.googleapis.com/v0/b/plant-scheduler.appspot.com/o/default.gif?alt=media&token=ccfeb641-a758-4df3-a9ee-339f9f7b6f29"; 
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
      <div className="overlay">
        <div className="box" id="ext">
        <a className="close" onClick={ (e) => {
          e.preventDefault(); 
          clearFields(); 
          close(); 
        }} href="/"> 
          &times;
        </a>
        <div>
        <h1 className="header">edit {props.current.name.toLowerCase()} </h1>
          {" "}
          <form className="content" onSubmit={(e) => { 
            e.preventDefault();
             edit(); 
            close();
          } 
          }>
            <label htmlFor="edit-nm">Name: </label>
            <input defaultValue={plant.name} id="edit-nm" className="fields" onChange={nameHandler}/> <br/> 
            <label htmlFor="edit-spec">Species: </label>
            <input defaultValue={plant.species} id="edit-spec" className="fields" onChange={speciesHandler}/>
            <br/> 
            <label htmlFor="edit-date">Last Watered: </label>
             <input type="date" defaultValue={plant.lastWatered} className="fields" id="edit-date" onChange={dateHandler}/> <br/>
             <label htmlFor="edit-freq">Watering Frequency: </label>
             <input type="number" className="fields" defaultValue={plant.frequency} id="edit-freq" onChange={frequencyHandler}/> <br/>
             <label htmlFor="edit-notes">Additional Notes: </label>
             <textarea defaultValue={plant.notes} id="edit-notes" className="fields" onChange={notesHandler} /> <br/> 
             <label htmlFor="edit-photo">Upload Photo:  </label>
             <input type="file" placeholder="Upload Photo" value={plant.photo} id="edit-photo" onChange={fileHandler} /> <br/> <br/>
              <label htmlFor="deleted"> Delete Plant </label>
              <input type="radio" onChange={deleteHandler} id="deleted" name="deleted" className="fields"/> 
             <p id="error">
             </p>
             <button type="submit" id="save">save changes</button>
          </form>
        </div>
        </div>
      </div>
    )}
  </Popup>
  )



}; 


export default EditPlant; 