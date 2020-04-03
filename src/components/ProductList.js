import React, {Component} from 'react'
import Product from './Product'
import Title from './Title';
import bg from '../backg.jpg';
import {storeProducts} from '../Data';
export default class ProductList extends Component{
///aici o sa returnam frumos lista cu produsele din magazin
state = {
    products:storeProducts

}

  render(){
    console.log(this.state.products);
     return (

       <React.Fragment>
       <img src={bg} alt="background-image" className="img-fluid" />
         <div className="py-5">
         <div className="container">
         <div className="row">
         <div className="col-md-12">

        </div>
         </div>
         <Title name="Produsele" title="noastre" />
           <div className="row">

           </div>
         </div>
         </div>
         </React.Fragment>
     );
   }

}
