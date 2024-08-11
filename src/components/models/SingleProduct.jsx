import React, { useState } from 'react';
import axios from 'axios';
import '../models/singleProduct.css'

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [productId, setProductId] = useState('');
  const [error, setError] = useState('');
  
  const fetchProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token não encontrado!');
        return;
      }

      const response = await axios.get(`https://interview.t-alpha.com.br/api/products/get-one-product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setProduct(response.data.data.product);
        setError('');
      } else {
        setError('Falha ao buscar o produto.');
      }
    } catch (error) {
      setError('Erro ao buscar o produto.');
      setTimeout(() => {
        setError(' ');
      }, 3000);
      console.error('Error fetching product:', error.message);
    }
  };

  const handleSearch = () => {
    if (productId) {
      fetchProduct(productId);
    } else {
      setError('Por favor, insira um ID de produto válido.');
    }
  };

  return (
    <div>
        <br />
        <br />
      <h2>Procure o produto pelo ID</h2>
      <br />
      <div>
        <input
          type="text"
          placeholder="Informe os 4 digitos"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        {" "}
        <button onClick={handleSearch}>Search</button>
     
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {product && (
        <div>
          <br />
          <br />
          <h3>Product Details:</h3>
          <br />
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> {product.price.toFixed(2)}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
