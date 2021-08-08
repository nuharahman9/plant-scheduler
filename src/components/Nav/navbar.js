import React from 'react'; 
import './navbar.css';
import AddPlant from './AddPlant'; 

const Navbar = (props) => { 

  return ( 
    <div className="nav"> 
      <button onClick={props.logoutHandler} className="navbutton">log out</button>
      <AddPlant onNewPlant={props.changeState} size={props.length + 1} /> 
    </div>
  )
}

export default Navbar; 