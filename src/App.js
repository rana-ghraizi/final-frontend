import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import Aboutus from './Pages/About Us/Aboutus';
import Paintings from './Pages/Paintings/Paintings';
import Login from './Pages/Login/Login';
import Cart from './Pages/Cart/Cart';
import Profile from './Pages/Profile/Profile';
import Register from './Pages/Register/Register';

function App() {
  return (
    <>
    <BrowserRouter>
        <div className="App"></div>
        <Routes>
          <Route
            path="/"
            element={
              <Home/>
            }
          />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/paintings" element={<Paintings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
