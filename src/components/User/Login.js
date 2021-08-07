import React, { useState, useEffect } from 'react'; 
import ReactDOM from 'react-dom'; 
import "firebase/auth"; 
import fire from "../Firebase/config"; 
import './Login.css'; 
import db from '../Firebase/db'; 
import PlantList from '../PlantList/PlantList';

const Login = () => { 
  const [currentUser, setCurrentUser] = useState(''); 
  const [enteredEmail, setEmail] = useState('');
  const [enteredPassword, setPassword] = useState(''); 
  const [hasAccount, setHasAccount] = useState(true); 
  const [emailError, setEmailError] = useState(''); 
  const [passwordError, setPasswordError] = useState(''); 
  const [errClass, setErrClass] = useState(''); 
  const rendered = [0]; 

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
  const clearFields = () => { 
    setEmail(''); 
    setHasAccount(true); 
    setEmailError(''); 
    setPassword(''); 
    setErrClass(''); 
   }; 

  const LoginHandler = (event) => {
    event.preventDefault(); 
    clearErrors(); 
    fire.auth().signInWithEmailAndPassword(enteredEmail, enteredPassword)
    .catch(error => { 
        switch(error.code) { 
          case "auth/invalid-email":
          case "auth/user-not-found":
            setErrClass('error'); 
            setEmailError(error.message); 
            break; 
          case "auth/wrong-password":
            setErrClass('error'); 
            setPasswordError(error.message);
            setPassword(''); 
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
            setErrClass('error'); 
            break; 
          case "auth/weak-password":
            setPasswordError(error.message);
            setErrClass('error');  
            break;
          default:
            authListener(); 
        }
    });    
    
  };



  const LogoutHandler = () => { 
    fire.auth().signOut().then(() => {
        clearFields(); 
        let sz = rendered.length; 
        rendered.splice(0, sz); 
        rendered.push(0); 
      ReactDOM.unmountComponentAtNode(document.getElementById("plantlist")); 
      setCurrentUser('');
    })
  };

  const authListener = () => { 
    fire.auth().onAuthStateChanged(user => { 
      if(user) { 
        if (user.uid !== currentUser.uid) { 
           const use = user;
          setCurrentUser(use);
          GetFeed(user.uid); 
        }
         
      } else { 
        if ('' !== currentUser) { 
          setCurrentUser(''); 
        }
        
      }
  })
  };

  async function GetFeed(id) { 
  //  ReactDOM.unmountComponentAtNode(document.getElementById("home")); 
    var user = db.collection('users').doc(id); 
      await user.collection('plants').get().then(snapshot => { 
       if (!snapshot.empty) {  
          rendered.splice(0, rendered.length); 
          snapshot.forEach(plant => {
              let doc = plant.data(); 
              const msec = Date.parse(doc.lastwatered) + (doc.wateringfrequency * 86400000); 
              const offset = new Date().getTimezoneOffset() * 60000; 
              let nextwater = (Math.ceil(( (msec) - (Date.now()) + offset) / 86400000)); 
              doc = { 
                ...doc, 
                nextwatering: nextwater
              }
              rendered.push(doc); 
          });     
       }
       ReactDOM.render(React.createElement(PlantList, {rendered: rendered, LogoutHandler},  null), document.querySelector("#plantlist"));

        }
    ); 
  }; 

  useEffect(() => {  
    authListener(); 
  });

  const toggleSettings = () => { 
    setHasAccount(!hasAccount); 
    colorHandler();
    clearErrors(); 
  }; 

  const colorHandler = () => { 
    setErrClass(''); 
  }
  
  function handleLogin() { 
    if (currentUser === '') { 
      return (
        <form>
        <div className="login">
          <label className="input-label">Email</label>
          <input type="email" id="username" className={errClass} onChange={emailHandler} onFocus={colorHandler} required/>
          <label className="input-label">Password</label>
          <input type="password" id="pass" className={errClass} onChange={passwordHandler} onFocus={colorHandler} required  />
          <p className="errorMsg">{passwordError}{emailError}</p>
          <div className="btnContainer">
            {hasAccount ? (
              <>
              <button onClick={LoginHandler}>sign in</button>
              <p>Don't have an account? <span onClick={toggleSettings} className="hover"><br/>Sign up</span></p>
              </> 
            ) : (
              <>
              <button type="submit" onClick={RegistrationHandler}>Register</button>
              <p>Already have an account? <span onClick={toggleSettings} className="hover">Sign In</span></p>
              </> 
            )}
          </div>
        </div>
      </form>
      ); 

    }
     else { 
      return (
        <div>
          Loading....
        </div>
      ); 

    }
 
  }


  return (
      <div> 
        {currentUser ? ( 
          <div id="plantlist">
          </div> 
        ) : 
            (handleLogin())}
      </div>
       
     
    ); 
}; 

export default Login; 