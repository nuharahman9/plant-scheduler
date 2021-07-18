import React, { useState, useEffect } from 'react'; 
import ReactDOM from 'react-dom'; 
import "firebase/auth"; 
import fire from "../Firebase/config"; 
import "./Login.css"; 
import db from '../Firebase/db'; 
import PlantList from '../PlantList/PlantList';

const Login = () => { 
  const [currentUser, setCurrentUser] = useState(''); 
  const [enteredEmail, setEmail] = useState('');
  const [enteredPassword, setPassword] = useState(''); 
  const [hasAccount, setHasAccount] = useState(true); 
  const [emailError, setEmailError] = useState(''); 
  const [passwordError, setPasswordError] = useState(''); 
  //const [Feed, setFeed] = useState(''); 
  const rendered = []; 


  const emailHandler = (event) => { 
    setEmail(event.target.value); 
  };
  const passwordHandler = (event) => { 
    setPassword(event.target.value); 
  };
  const clearErrors = () => { 
    setEmailError(''); 
    setPasswordError(''); 
  };
 // const clearInput = () => { 
   // setPassword(''); 
 // }; 

  const LoginHandler = (event) => {
    event.preventDefault(); 
    clearErrors(); 
    fire.auth().signInWithEmailAndPassword(enteredEmail, enteredPassword)
    .catch(error => { 
        switch(error.code) { 
          case "auth/invalid-email":
          case "auth/user-not-found":
            setEmailError(error.message); 
            break; 
          case "auth/wrong-password":
            setPasswordError(error.message);
            break;
          default: 
            

        }
    });  
  };

  const RegistrationHandler = (event) => {
    event.preventDefault(); 
    clearErrors(); 
    fire.auth().createUserWithEmailAndPassword(enteredEmail, enteredPassword)
    .catch(error => { 
        switch(error.code) { 
          case "auth/invalid-email":
          case "auth/email-already-in-use":
            setEmailError(error.message); 
            break; 
          case "auth/weak-password":
            setPasswordError(error.message);
            break;
          default:
            authListener(); 
        }
    });    
    
  };


  const LogoutHandler = () => { 
    fire.auth().signOut(); 
    setCurrentUser((prevState) => {
      return {...prevState, currentUser: ""}
    }); 
  };

  const authListener = () => { 
    fire.auth().onAuthStateChanged(user => { 
        if(user) { 
          setCurrentUser(user); 
          GetFeed(); 
          console.log(currentUser);
        } else { 
          setCurrentUser(""); 
        }
    })
  };

  async function GetFeed() { 
    var user = db.collection('users').doc(currentUser.uid); 
      await user.collection('plants').get().then(snapshot => { 
       if (!snapshot.empty) {  
          snapshot.forEach(doc => rendered.push(doc.data()));  
          ReactDOM.render(React.createElement(PlantList, {rendered: rendered, LogoutHandler},  null), document.querySelector("#plantList")); 
       }
        }
    ); 
  }; 

  useEffect(() => {  //not sure if this needs to be here 
    authListener(); 
    
  });

  const toggleSettings = () => { 
    setHasAccount(!hasAccount); 
    clearErrors(); 

  }; 
  

  return (
       
      <div> 
        {currentUser ? ( 
          <div id="homepage">  
            <div id="plantList">

            </div>
            </div> 
   
        ) : 
            (
          <form>
           
          <div className="login-style">
            <label>Username</label>
            <input type="email" id="username" onChange={emailHandler}/>
            <label>Password</label>
            <input type="password" id="pass" onChange={passwordHandler} required value={enteredPassword}/>
            <p className="errorMsg">{passwordError}{emailError}</p>
            <div className="btnContainer">
              {hasAccount ? (
                <>
                <button onClick={LoginHandler}>Sign In</button>
                <p>Don't have an account? <span onClick={toggleSettings}>Sign up</span></p>
                </> 
              ) : (
                <>
                <button type="submit" onClick={RegistrationHandler}>Register</button>
                <p>Already have an account? <span onClick={toggleSettings}>Sign In</span></p>
                </> 
              )}
            </div>
          </div>
        </form>

        )}
      </div>
       
     
    ); 
}; 

export default Login; 