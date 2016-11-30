import React from 'react';
import Footer from './Footer';

//a "root" component
class App extends React.Component {
  //how to display this component
  render() {
    return (
      <div>
        <div>{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

//more Components can go here!


export default App; //make this class available to other files (e.g., index.js)
