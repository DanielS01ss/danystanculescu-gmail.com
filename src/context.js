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
  cartSubtotal:0,
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

        const crt = localStorage.getItem('myCart');
        this.setState({cart: JSON.parse(crt) ? JSON.parse(crt) : []},()=>{



          let gtItm = (id) =>{
            const product = this.state.products.find(item => item.id===id);
            return product;
          };

          let tempProducts = [...this.state.products];
          this.state.cart.forEach(element=>{

             ///la elementul pe care il avem trebuie sa ii setam valorie
            const index = tempProducts.indexOf(gtItm(element.id));
            const product = tempProducts[index];
            product.inCart = true;
            product.count = 1;
            const price  = product.price;
            product.total = price;


          });

          this.setState(()=>{
            return {products:tempProducts};
          }) ;


        });

        let myTax = localStorage.getItem("total");

        ///aici retragem din local storage taxa totalul si chestii de astea
        if(myTax!=null)
        {
          myTax = JSON.parse(myTax);

          this.setState(()=>{
              return{
                cartSubtotal:myTax.subtotal,
                cartTax:myTax.taxa,
                cartTotal:myTax.totalul
              }
          });

        }






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

},() => {
  this.addTotals();
  localStorage.setItem('myCart', JSON.stringify(this.state.cart));
});

///adauga id-ul si la local storage
};

////aici incrementam numarul de bucati la un produs
increment = (id) => {

  let tempCart = [...this.state.cart];
  const selectProduct = tempCart.find(item=>item.id === id);
  ///acuma cautam indexul
  const index = tempCart.indexOf(selectProduct);
  const product = tempCart[index];

  product.count =product.count+1;
  product.total = product.count*product.price;

  this.setState(()=>{
    return{cart:[...tempCart]}
  },()=>{
    this.addTotals();
    localStorage.setItem("myCart",JSON.stringify(tempCart));
  })

};

///aici il decrementam
///aici scoatem un item din cart
/// foloseste functia removeItem ca sa il scoti si din local storage sa nu te incurce!!
removeItem = (id) =>{

    let tempProducts = [...this.state.products] ;
    let tempCart = [...this.state.cart];

    tempCart = tempCart.filter(item=>item.id!==id);

///aflam indexul
    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState(()=>{
      return {
        cart:[...tempCart],
        products:[...tempProducts]
      }
    },()=>{
      this.addTotals();
    });;

///trebuie sa scoatem un element si din localStorage
let produse  = localStorage.getItem("myCart");
produse = JSON.parse(produse);
for(let i=0;i<produse.length;i++)
{

  if(produse[i].id === id)
  {
     produse.splice(i,1);
     break;
  }
}
///acuma updatam din nou localStorage
if(produse.length!=0)
{  produse = JSON.stringify(produse);
    localStorage.setItem("myCart",produse);
}
else{
  localStorage.setItem("myCart","[]");
}

};

decrement = (id) =>{

  let tempCart = [...this.state.cart];
  const selectProduct = tempCart.find(item=>item.id === id);

  const index = tempCart.indexOf(selectProduct);
  const product  = tempCart[index];
  product.count = product.count -1;
  if(product.count === 0 )
  {
    this.removeItem(id);
  }
  else{
    product.total = product.count * product.price;
    this.setState(
      ()=>{
        return {cart:[...tempCart]};
      },
      ()=>{
        this.addTotals();
        localStorage.setItem("myCart",JSON.stringify(tempCart));
      }
    )
  }

};
///aici scoatem toate itemele din cart
///fi atent aici sa golesti local cache

clearCart = (id)=>{
  localStorage.clear();
  this.setState(()=>{
    return {cart:[]}

  },()=>{
    ///setam toate obiectele la default
    this.setProducts();
    this.addTotals();
  });

}

///aceasta functie aduna toate sumele la final ca sa ne dea totalul

addTotals = ()=>
{

  let subTotal = 0;
  this.state.cart.map(item =>(subTotal+=item.total));
  const tempTax = subTotal*0.01;
  const tax = parseFloat(tempTax.toFixed(2));
  const total = subTotal+tax;

  ///salvam si in storageul local
  //localStorage.setItem("totaluri",taxe);
  let myrez = {
     taxa:tax,
     totalul:total,
     subtotal:subTotal
  };

  localStorage.setItem("total",JSON.stringify(myrez));

  this.setState(()=>{
      return{
        cartSubtotal:subTotal,
        cartTax:tax,
        cartTotal:total
      }
  });

};



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
