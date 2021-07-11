import Feed from '../Feed/Feed'; 
import React from 'react'; 

const Home = ({ logoutHandler, currID }) => { 
  const uid = currID.toString(); 

  return ( 
    <div> 
       <p>hi!</p>
      <button onClick={logoutHandler}>Log Out</button>
      <Feed curr={uid}> </Feed>
    </div>
   
  )
}

export default Home; 