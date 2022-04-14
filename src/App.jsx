import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Home, About, Login, Register, Cards, Play } from "./pages";
import { useAuth } from "./hooks/auth";
import { Nav } from "./Nav";

function WithoutLogin({ children }) {
  const auth = useAuth();
  if (auth.isLoggedIn()) {
    return <Navigate to="/" />;
  }
  return children;
}
function WithLogin({ children }) {
  const auth = useAuth();
  if (!auth.isLoggedIn()) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  return (
    <div className="app">
      <Nav className="container" />
      <main className="container p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/login"
            element={
              <WithoutLogin>
                <Login />
              </WithoutLogin>
            }
          />
          <Route
            path="/register"
            element={
              <WithoutLogin>
                <Register />
              </WithoutLogin>
            }
          />
          <Route
            path="/me"
            element={
              <WithLogin>
                <Cards />
              </WithLogin>
            }
          />
          <Route
            path="/play"
            element={
              <WithLogin>
                <Play />
              </WithLogin>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
