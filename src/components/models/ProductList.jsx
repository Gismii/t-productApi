import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../models/productList.css';
import BtnCreateProduct from '../BtnCreateProduct';
import UpdateProductModal from './UpdateProductModal'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false); 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token não encontrado!');
        return;
      }

      const response = await axios.get('https://interview.t-alpha.com.br/api/products/get-all-products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 && response.data.success) {
        setProducts(response.data.data.products);
      } else {
        console.error('Falha ao buscar produtos:', response.status);
      }
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token não encontrado!');
        return;
      }

      const response = await axios.delete(`https://interview.t-alpha.com.br/api/products/delete-product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
       
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      } else {
        console.error('Falha ao deletar o produto:', response.status);
      }
    } catch (error) {
      console.error('Error deleting product:', error.message);
    }
  };

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedProduct(null);
    setUpdateModalOpen(false);
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <BtnCreateProduct />
      <br />
      <h2>Lista de Produto</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <button onClick={() => deleteProduct(product.id)}>Delete</button>
                  
                  <button onClick={() => openUpdateModal(product)}>Update</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No products found.</td>
            </tr>
          )}
        </tbody>
      </table>
      {selectedProduct && (
        <UpdateProductModal
          isOpen={isUpdateModalOpen}
          onClose={closeUpdateModal}
          product={selectedProduct}
          onProductUpdated={fetchProducts} 
        />
      )}
    </div>
  );
};

export default ProductList;
