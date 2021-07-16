//import React, {useEffect } from 'react'; 
//import db from '../Firebase/db'

const Navbar = ({ logoutHandler, addPlantPopup }) => { 
 // const [feed, setFeed] = useState(false); 
 // const uid = currID.toString(); 
  //const rendered = []; 


  return ( 
    <div> 
      <button onClick={logoutHandler}>Log out</button>
      <button onClick={addPlantPopup}>+ New Plant</button> 
    </div>
   
  )
}

export default Navbar; 