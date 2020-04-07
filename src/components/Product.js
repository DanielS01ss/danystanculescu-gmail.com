import React , {Component} from 'react'
//import Product from "./Product";
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ProductConsumer} from '../context';
import PropTypes from 'prop-types';

export default class Product extends Component{
  render(){
    const {id,title,img,price,inCart} = this.props.product;

    return(
        <ProductWrapper className="col-10 col-md-4 col-lg-3 mt-5 ml-4">
          <div className="card h-100">
          <ProductConsumer>
            {(value) => (
              <div className="img-container p-5 h-100" onClick={() => value.handleDetail(id)}>
              <Link to="/details">
              <img src={img} alt="product" className="card-img-top"></img>
              </Link>

            <div className="card-body">
              <button
                className = "cart-btn"
                disabled = {inCart ? true : false}
                onClick = {()=>{
                   value.addToCart(id);
                   value.openModal(id);

                }}
                  >
                  {inCart?(
                    <p className="text-capitalize mb-0" disabled>
                    {" "}
                    In Cos
                    </p>
                  )
                  :(
                    <i className="fas fa-cart-plus"/>

                  )}
                </button>
                </div>
                </div>
            )
            }
            </ProductConsumer>
            {/* card footer*/}
            <div className="card-footer d-flex justify-content-between">
              <p className="align-self-center mb-0">
              {title}
              </p>
              <h5 className="text-blue font-italic mb-0">
                <span className="mr-1">Ron</span>
                {price}
              </h5>
            </div>
          </div>
        </ProductWrapper>
    );
  }
}

Product.propTypes = {
  product:PropTypes.shape({
    id:PropTypes.number,
    img:PropTypes.string ,
    title:PropTypes.string,
    price:PropTypes.number,
    inCart:PropTypes.bool

  }).isRequired

}


const ProductWrapper  = styled.div`
  .card{
    border-color:transparent;
    transition : all 1s linear;

  }
  .card-footer{
      background:transparent;
      border-top:transparent;
      transition : all 1s linear;
  }

  &:hover{
      .card{
        bord:0.04rem solid rgba(0,0,0,0.2);
        box-shadow : 2px 2px 5px 0px rgba(0,0,0.2);

      }

      .card-footer{
          background:rgba(247,247,247);

      }
  }

  .img-container{
      position:relative;
      overflow : hidden;
  }

.card-img-top{
  transition: all 1s linear;
}

.img-container:hover .card-img-top{
  transform:scale(1.2);

}

.cart-btn{
  position:absolute;
  bottom:0;
  right:0;
  padding:0.2rem 0.4rem;
  background:var(--mainDark);
  border:none;
  color:var(--mainWhite);
  font-size:1.4rem;
  border-radius:0.5rem 0 0 0;
}

.cart-btn:hover{
  cursor:pointer;
}

`;
