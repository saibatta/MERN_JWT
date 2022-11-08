import React from 'react'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './components/login.component'
import SignUp from './components/signup.component'
import { Movies } from './components/movies.component'
import { logout } from './services/authentication.services';
function App() {
  const onLogout = () => {
    logout({ token: localStorage.getItem('token') }).then((data) => {
      console.log('**User Successfully Logout !!**', data);
      localStorage.removeItem('token');
      window.location.assign('/sign-in')
    }).catch((error) => console.log('**User Logout Failed !!!!**', error))
  }
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              Movies
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                {!localStorage.getItem("token") ?
                  (<><li className="nav-item">
                    <Link className="nav-link" to={'/sign-in'}>
                      Login
                    </Link>
                  </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/sign-up'}>
                        Sign up
                      </Link>
                    </li></>) :
                  <li className="nav-item">
                    <Link className="nav-link" onClick={onLogout} >
                      Logout
                    </Link>
                  </li>}
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/movies" element={<Movies />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App