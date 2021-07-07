import React from 'react'; 

const Home = ({ logoutHandler }) => { 
  return ( 
    <div> 
       <p>hi!</p>
      <button onClick={logoutHandler}>Log Out</button>
    </div>
   
  )
}

export default Home; 