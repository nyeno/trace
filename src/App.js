import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Landing from './pages/Landing'
import Signup from "./pages/Signup";
import Signin from './pages/Signin';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
