import React from 'react';
import  Header  from './MyHeader';
import ProductList from './models/ProductList';
import Container from './Container';
import SingleProduct from './models/SingleProduct';

function Home() {
  return (
     <>
      <Header />
      
      <Container>
        <SingleProduct />
        <ProductList />
        
      </Container>
     
     </>
      
  );
}

export default Home;

