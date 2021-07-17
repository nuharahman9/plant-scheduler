//import React, {useEffect } from 'react'; 
//import db from '../Firebase/db; 
import AddPlant from './AddPlant'; 

const Navbar = ({ logoutHandler, length }) => { 

  return ( 
    <div> 
      <button onClick={logoutHandler}>Log out</button>
      <AddPlant size={length+1} /> 
      

    </div>
  )
}

export default Navbar; 