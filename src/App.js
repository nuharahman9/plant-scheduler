import Login from './components/User/Login'; 
import React, { Component }  from 'react'; 

class App extends Component {
  render() { 
    return (
      <div>
        <h2>Plant Scheduler</h2>
        <Login></Login>
        <div id="home">
        </div>
      </div>
    );

  }

}

export default App;