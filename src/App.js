import './App.css';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Landing from './pages/Landing'
import Signup from "./pages/Signup";
import Signin from './pages/Signin';
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { JobsContextProvider } from './context/JobsContext';
import PostJob from './pages/PostJob';
import Tracer from "./pages/Tracer";
import { TraceContextProvider } from './context/TraceContext';
import { SidebarLayout } from "./components/Layout";
import { ThemeContextProvider } from './context/ThemeContext';


function App() {
  //const { isAuth } = useUserAuth()
  return (
    <div className="App">
      <ThemeContextProvider>
        <UserAuthContextProvider>
          <JobsContextProvider>
            <TraceContextProvider>
              <Header />

              <Routes className="mt-16">
                <Route exact path="/" element={<Landing />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/signin" element={<Signin />} />
                <Route element={<SidebarLayout />}>
                  <Route
                    path="/home"
                    element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/postJob"
                    element={
                      <ProtectedRoute>
                        <PostJob />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/myJobs"
                    element={
                      <ProtectedRoute>
                        <Tracer />
                      </ProtectedRoute>
                    }
                  />
                </Route>
              </Routes>
            </TraceContextProvider>
          </JobsContextProvider>
        </UserAuthContextProvider>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
