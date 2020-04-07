import React, {Component}  from 'react'
import {ProductConsumer} from '../context';
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button';


export default class Details extends Component{

  render(){

    return(
      <ProductConsumer>
        { value =>{
          const {
            id,
            company,
            img,
            info,
            price,
            title,
            inCart
          } = value.detailProduct;
          return(
          <div className="container py-5">
            {/*titlul*/}
            <div className="row">
              <div className="col-10 mx-auto text-center text-slanted text-dark my-5">
                <h1>{title}</h1>
              </div>
            </div>
            {/*end title*/}
            {/*product info */}
            <div className="row">
              <div className="col-10 mx-auto col-md-6 my-3 ">
                <img src={img} className="img-fluid" alt="product"/>

              </div>
              {/* product text */}
              <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                  <h2> Model :{title} </h2>
                  <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                    Made by : <span className="text-upppercase">
                    {company}
                    </span>
                  </h4>
                  <h4 className="text-danger">
                    <strong>
                      Pret :  {price}
                    </strong>
                  </h4>
                  <p className="text-capitalize font-weight-bold mt-3 mb-0">
                  Informatii despre produs:
                  </p>
                  <p className="text-muted lead">
                  {info}
                  </p>
                  {/* aici avem cele doua butoane de Adaugare in cos si de inapoi*/}
                  <div className="py-5">
                    <Link to='/'>
                      <ButtonContainer>
                   <span>  ← Inapoi </span>
                      </ButtonContainer>

                    </Link>
                  <span className="pl-xl-4" >
                    <ButtonContainer cart disabled={inCart?true:false} onClick={()=>{
                      value.addToCart(id);
                      value.openModal(id);
                    }}>
                      {inCart?<span className="text-danger h4">Produsul se afla in cos!</span>:'Adauga in cos  🛒'}
                    </ButtonContainer>
                  </span>
                  </div>
              </div>
            </div>

          </div>

          )

        }}

      </ProductConsumer>

    )
  }
}
