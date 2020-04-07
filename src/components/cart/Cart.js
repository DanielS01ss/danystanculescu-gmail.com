import React, {Component} from 'react';
import Title from '../Title'
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import {ProductConsumer} from '../../context';
import CartList from './CartList';
import CartTotals from './CartTotals'


export default class Cart extends Component{
 ///vom avea si aicea un condintional rendering
 /// adica vom afisa mesajul cu  : Cosul tau este gol numai cand cosul va fi gol!!
render(){
    return(
        <section>
        <ProductConsumer>
          {value =>{
            const {cart} = value;


            if(cart.length>0)
            {
                return (
                  <React.Fragment>
                 <h1 className="text-center text-dark">Cosul Tau</h1>
                  <CartColumns/>

                  <CartList value={value}/>
                  <CartTotals value={value}/>
                  </React.Fragment>
                );

            }
            else{
              return <EmptyCart/>
            }


          }}

          </ProductConsumer>

        </section>
    );
  }
}
