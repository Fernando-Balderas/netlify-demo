import logo from './logo.svg';
import React from 'react';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    const apiUrl = 'http://localhost:5001/todos';
    // const apiUrl = 'https://jsonplaceholder.typicode.com/users';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => console.log('This is your data', data));
  }
  render() {
    return <h1>my Component has Mounted, Check the browser 'console' </h1>;
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Yo, We did it!</h1>
//       </header>
//     </div>
//     // <div className="App">
//     //   <header className="App-header">
//     //     <img src={logo} className="App-logo" alt="logo" />
//     //     <p>
//     //       Edit <code>src/App.js</code> and save to reload.
//     //     </p>
//     //     <a
//     //       className="App-link"
//     //       href="https://reactjs.org"
//     //       target="_blank"
//     //       rel="noopener noreferrer"
//     //     >
//     //       Learn React
//     //     </a>
//     //   </header>
//     // </div>
//   );
// }

export default App;
