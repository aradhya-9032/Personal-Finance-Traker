// // import  React  from 'react';
// import Header from './components/Header';
// import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
// import Dashboard from "./pages/Dashboard";
// import Signup from"./pages/Signup";
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Signup/>}/>
//         <Route path="/dashboard" element={<Dashboard/>}/>
//       </Routes>
//     </Router>
//     // <div className="App">
//     // <Header/>
//     // </div>
//   );
// }

// export default App;

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignUpSignIn from "./components/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpSignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

