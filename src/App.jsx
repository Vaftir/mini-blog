import "./App.css";
//react routes
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//react hooks
import { useState, useEffect } from "react";

//custom hooks
import { useAuthentication } from "./hooks/useAuthentication";

//firebase
import { onAuthStateChanged } from "firebase/auth";

//context import
import { AuthContextProvider } from "./context/AuthContext";

//pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreatePost from "./pages/CreatePost/CreatePost";
import Dashboard from "./pages/Dashboard/Dashboard";
import Busca from "./pages/Busca/Busca";
import Post from "./pages/Post/Post";
import EditPost from "./pages/EditPost/EditPost";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined; /// se undefined for true quer dizer que esta carregando

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <div className="App">
        <AuthContextProvider value={{ user }}>
          <BrowserRouter>
            <NavBar />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<Busca />} />
                <Route path="/posts/:id" element={<Post />} />
                <Route
                  path="/login"
                  element={!user ? <Login /> : <Navigate to="/" />}
                />
                <Route
                  path="/register"
                  element={!user ? <Register /> : <Navigate to="/" />}
                />
                <Route
                  path="/dashboard"
                  element={user ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route
                  path="/posts/create"
                  element={user ? <CreatePost /> : <Navigate to="/login" />}
                />
                <Route
                  path="/posts/edit/:id"
                  element={user ? <EditPost /> : <Navigate to="/login" />}
                />
              </Routes>
            </div>
            {/*FIM CONTANIER */}
            <Footer />
          </BrowserRouter>
        </AuthContextProvider>
      </div>
    </>
  );
}

export default App;
