import React from 'react';
import {Switch,Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from'./components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/cart';
import Default from './components/Default';
import  Modal from './components/Modal';


///aici vine codul HTML care va fi pus pe pagina
///si gen vine in body asa ca ne apucam si punem exact ce vrem

///Navbarul trebuie sa fie in toate paginile!!!
///Asa ca nu il scoatem

function App() {
  return (
      <React.Fragment>
        <Navbar></Navbar>
        <Switch>
          <Route exact path="/" component = {ProductList} />
          <Route path="/details" component = {Details} />
          <Route path ="/cart"  component = {Cart} />
          <Route component={Default}/>
        </Switch>
        <Modal/>
      </React.Fragment>
  );
}

export default App;
