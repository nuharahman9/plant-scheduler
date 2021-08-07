import Login from './components/User/Login'; 
import React, { Component }  from 'react'; 
import "./App.css"; 

class App extends Component {
  render() { 
    return (
      <div>
        <h2 className="main">plAnt scHeduleR</h2>
        <Login></Login>
        <div id="home">
        </div>
      </div>
    );

  }

}

export default App;