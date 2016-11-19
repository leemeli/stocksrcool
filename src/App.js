import React from 'react';

//a "root" component
class App extends React.Component {
  //how to display this component
  render() {
    return (
      <div>
        <h1>Hello React!</h1>
        <p>If you can see this, then things are working!</p>
        <p>Modify the <code>src/App.js</code> file to define your components</p>
      </div>
    );
  }
}

//more Components can go here!


export default App; //make this class available to other files (e.g., index.js)
