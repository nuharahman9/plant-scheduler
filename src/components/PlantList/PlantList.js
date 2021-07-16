import React from 'react'; 
import Navbar from '../Nav/navbar'; 

function PlantList(props) {
  //  const[rendered, setRendered] = useState(''); 
    //if (!rendered.empty) {
      //setRendered(props.rendered); 
   // }

    return (
      <div>
        <Navbar logoutHandler={props.LogoutHandler}/> 
      <ul>
        {props.rendered.map((doc) => 
          <div key={doc.id}>
        <img src={doc.photo} alt=""/> 
        <p>name: {doc.name}
          , species: {doc.species}, 
          notes: {doc.notes}, 
          water every {doc.wateringfrequency} days. 
        </p>
            
             </div>)}
      </ul>

      </div>
      
    );
 
  

}; 



export default PlantList;  