//import React, {useEffect } from 'react'; 
//import db from '../Firebase/db; 
//mport PlantList from '../PlantList/PlantList'; 
import AddPlant from './AddPlant'; 

const Navbar = (props) => { 

  return ( 
    <div> 
      <button onClick={props.logoutHandler}>Log out</button>
      <AddPlant onNewPlant={props.changeState} size={props.length + 1} /> 
    </div>
  )
}

export default Navbar; 