import "firebase/auth";
import "firebase/firestore"; 
import React from 'react'; 
import db from "../Firebase/db"; 
import Plant from "./Plant"; 


const Feed = ( curr ) => { 
  const rendered = [];  
  //let items = ''; 
  const str = String(curr.curr);  

  async function getFeed() { 
    var user = db.collection('users').doc(str); 
     await user.collection('plants').get().then(snapshot => { 
       if (snapshot.empty) {
          console.log("empty!!"); 
        } else { 
            snapshot.forEach(doc => rendered.push(
              <Plant name={doc.data().name} wateringfrequency={doc.data().wateringfrequency} species={doc.data().species} lastwatered={doc.data().lastwatered} photo={doc.data().photo} notes={doc.data().notes} />
            )); 
          }
          console.log(rendered);    
        }
      
    ); 
  }; 
  


  getFeed(); 
  return (
    <div>
      {rendered.empty ? (
        <p>nothing to see here!</p>
      ) : (
        <p>{rendered.toLocaleString()}</p>
      )}

    </div>

  );



}; 
export default Feed; 

