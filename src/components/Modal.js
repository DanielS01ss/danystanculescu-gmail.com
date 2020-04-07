import React, {Component} from 'react';
import styled from 'styled-components';
import {ProductConsumer} from '../context';
import {ButtonContainer} from './Button';
import {Link} from 'react-router-dom';

export default class Modal extends Component{
///aici avem de a face cu conditional Rendering in sensul ca modulul nu apare decat cand
/// openModal este true
  render(){
    return(
      <ProductConsumer>
      {(value)=>{
        
        return
      }}
      </ProductConsumer>
    )
  }
}
