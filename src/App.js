/**
 * Author : Nidhi Gadhavi
 * Purpose : Main React App
 */

import React from 'react';
import Routers from './route/routers'

class App extends React.Component {
  constructor(props) {
    super(props);    
  }
  
  render() {
    return (
      <Routers />
    );
  }
}

export default App;
