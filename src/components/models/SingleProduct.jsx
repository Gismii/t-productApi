import React, { useState } from 'react';
import axios from 'axios';
import CreateProductModal from './CreateProductModal';
import '/home/gismi/TestesTecnicos/t-alphaApi/src/components/models/singleProduct.css'

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [productId, setProductId] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
      <h2>Search for a Product</h2>
      <div>
        <input
          type="text"
          placeholder="Enter Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <div className="content">
        <button onClick={handleOpenModal}>Criar Novo Produto</button>
        <CreateProductModal isOpen={isModalOpen} onClose={handleCloseModal} />
        {/* Aqui você pode adicionar outros componentes, como a lista de produtos */}
      </div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {product && (
        <div>
          <h3>Product Details</h3>
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
