import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './App.css'
import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';


import { loadUser } from './actions/userActions';
import store from './store'; 
import createEvent from './components/events/createEvent';
import allEvents from './components/events/allEvents';
import EventDescription from './components/events/EventDescription';


function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  },[])

  return (
    <Router>
      <div className='App'>
        <Header />
        <div className='container container-fluid'>
          <Routes>
            <Route path='/' Component={Home} exact />
            <Route path='/product/:id' Component={ProductDetails} exact/>
            <Route path='/lgn' Component={Login} />
            <Route path='/register' Component={Register}/>
            <Route path='/me' Component={Profile} />
            <Route path='/create/event' Component={createEvent} />
            <Route path='/events' Component={allEvents} />
            <Route path= "/event/:id" Component={EventDescription} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
