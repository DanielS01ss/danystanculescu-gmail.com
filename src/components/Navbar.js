import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../logo.svg';
import styled from 'styled-components';
import {ButtonContainer} from './Button'

export default class Navbar extends Component {
  render(){
    return(
      <NavWrapper className="navbar bg-white navbar-expand-sm navbar-dark px-sm-5">
        <Link to="/">
         <img src={logo} alt="store" className="navbar-brand"/>
        </Link>
        <ul className="navbar-nav align-items-center">
          <li className="navbar-nav align-items-center">
            <Link to="/" className="nav-link text-dark h5">
              Produse
            </Link>
          </li>
        </ul>
          <Link to='/cart' className="ml-auto">
              <ButtonContainer>
            <span>
            <i className="fas fa-shopping-cart"/>
            </span>
            Cosul Meu
              </ButtonContainer>
          </Link>
      </NavWrapper>
    )
  }
}



const NavWrapper = styled.nav`
    .nav-link{
        
        font-size:1.3rem;
        text-transform:capitalize;
  `
