import React, { useState, useEffect } from 'react'; 
import "firebase/auth"; 
import fire from './config'; 
import Home from '../Homepage/homepage'; 

const Login = () => { 
  const [enteredEmail, setEmail] = useState('');
  const [enteredPassword, setPassword] = useState(''); 
  const [currentUser, setCurrentUser] = useState(''); 
 // const [hasAccount, setHasAccount] = useState(false); 
  
  const emailHandler = (event) => { 
    setEmail(event.target.value); 
  };
  const passwordHandler = (event) => { 
    setPassword(event.target.value); 
  };

  const LoginHandler = (event) => {
    event.preventDefault(); 
    fire.auth().signInWithEmailAndPassword(enteredEmail, enteredPassword)
    .catch(error => { 
        setPassword(''); 
        //change later for individual cases 
    });  
    
  //  console.log(LoginData); 

  };

  const LogoutHandler = () => { 
    fire.auth.signOut(); 
  };

  const authListener = () => { 
    fire.auth().onAuthStateChanged(user => { 
        if(user) { 
          setCurrentUser(user); 
          console.log(currentUser); 
        } else { 
          setCurrentUser(""); 
        }

    })
  };

  useEffect(() => { 
    authListener(); 
  });

 

  return (
      <div> 
        {currentUser ? (
          <Home logoutHandler={LogoutHandler} />
        ) : (
          <form onSubmit={LoginHandler}>
          <div className="login-style">
            <input type="email" onChange={emailHandler}/>
            <input type="password" onChange={passwordHandler} value={enteredPassword}/>
            <button type="submit">Login</button>
          </div>
        </form>

        )}
       
      
      </div>
       
     
    ); 
}; 

export default Login; 