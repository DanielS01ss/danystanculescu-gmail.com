import React, {Component} from 'react'
import {storeProducts,detailProduct} from './Data';

const ProductContext = React.createContext();
///Provider
///Consumer

class ProductProvider extends Component{

state ={
  products:[],
  detailProduct:detailProduct,
  cart:[],
  modalOpen:false,
  modalProduct:detailProduct,
  cartSubtTotal:0,
  cartTax:0,
  cartTotal:0,
};

///asta e rulata prima data
///aici ne ocupam de local storage adica daca sunt keys acolo le luam
/// si vom apela pentru fiecare id addToCart(id)


openModal = id =>{
  const product = this.getItem(id);
  this.setState(()=>{

    return {modalProduct:product,modalOpen:true}
  });
}

closeModal= ()=>{
  this.setState(()=>{
    return{modalOpen:false}
  });
}


componentDidMount(){
        this.setProducts();
        const cart = localStorage.getItem('myCart')
        this.setState({cart: JSON.parse(cart) ? JSON.parse(cart) : []},()=>{
        this.state.cart.forEach(element =>{
          let id = element.id;
          let tempProducts = [...this.state.products];
          const index = tempProducts.indexOf(this.getItem(id));
          const product = tempProducts[index];
          product.inCart = true;
          product.count = 1;
          const price  = product.price;
          product.total = price;
        

        });


        });


};

setProducts = () =>{

  let tempProducts  = [];
   storeProducts.forEach(item => {

     ///copiem valori din object
     const  singleItem = {...item};
     tempProducts = [...tempProducts,singleItem];

   });
   this.setState(()=>{
     return {products:tempProducts}
   });
}

///aici manipulam fiecare produs in parte
handleDetail = (id) => {

///ne declaram o variabila unde stocam PRODUSUL  pe care l-am stoca
const product = this.getItem(id);
this.setState(()=>{
    return {detailProduct:product};
})


};

///aceasta functie ne returneaza itemul din lista cu idul precizat la parametru
getItem = (id) =>{
  const product = this.state.products.find(item => item.id===id);
  return product;
}

///aici vom face functionalitatea de adaugare in cos

///in momentul in care adaugam un item in cos vreau ca si
addToCart = (id) => {

let tempProducts = [...this.state.products];
const index = tempProducts.indexOf(this.getItem(id));
const product = tempProducts[index];
product.inCart = true;
product.count = 1;
const price  = product.price;
product.total = price;

this.setState(()=>{
   return {products:tempProducts,cart:[...this.state.cart,product]};

},
        () => {
            ///this.addTotal();
            localStorage.setItem('myCart', JSON.stringify(this.state.cart));
            console.log(this.state.cart);
        });

///adauga id-ul si la local storage
};

////aici incrementam numarul de bucati la un produs
increment = (id) => {

  console.log('this is increment method');

};

///aici il decrementam
///aici scoatem un item din cart
/// foloseste functia removeItem ca sa il scoti si din local storage sa nu te incurce!!
removeItem = (id) =>{
   console.log("item removed");
};

decrement = (id) =>{
  console.log("idfdsfdgfd");
}
///aici scoatem toate itemele din cart
///fi atent aici sa golesti local cache

clearCart = (id)=>{
  console.log("car")

}




  render(){

    return(

          <ProductContext.Provider value={{
       ...this.state,
       handleDetail:this.handleDetail,
       addToCart:this.addToCart,
       openModal:this.openModal,
       closeModal:this.closeModal,
       increment:this.increment,
       decrement:this.decrement,
       removeItem:this.removeItem,
       clearCart:this.clearCart
          }}>

            {this.props.children}
          </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer;


export {ProductProvider,ProductConsumer};
