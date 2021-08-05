import React, { useState } from 'react'; 
import fire from '../Firebase/config'; 
import db from '../Firebase/db'; 

 function CheckWatered(props) { 
 const [updated, setUpdate] = useState(false); 
  let doc = props.current; 
  async function getDateStr() {
    let msec = Date.now(); 
    const today = new Date(msec); 
    console.log(today); 
    let dateStr = today.getFullYear() + "/" + ( today.getMonth() + 1) + "/" + today.getDate(); 
    console.log(dateStr); 
    doc = { 
      ...doc, 
      nextwatering: 0, 
      lastwatered: dateStr
    }; 
    let uid = fire.auth().currentUser.uid;
    const user =  db.collection('users').doc(uid);
    await user.collection('plants').doc(doc.id.toString()).set(doc).then(() => {
      setUpdate(true); 
     props.onEdit(doc); 
    });  
 
  }; 

  fire.auth().onAuthStateChanged(() => {setUpdate(false)}); 


return (
  <div>
     { updated ? (
    <p> </p>
 ) : (
 <button onClick={getDateStr}>Click me to water {props.current.name}</button>

 )}
  </div>

)  

}; 

export default CheckWatered; 