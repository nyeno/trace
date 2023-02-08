import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Landing from './pages/Landing'
import Signup from "./pages/Signup";
import Signin from './pages/Signin';
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";


function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <Header />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Signin />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
