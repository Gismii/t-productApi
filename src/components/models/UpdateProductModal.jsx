import React, { useState } from 'react';
import axios from 'axios';

const UpdateProductModal = ({ isOpen, onClose, product, onProductUpdated }) => {
  const [name, setName] = useState(product.name);
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token não encontrado!');
        return;
      }

      const response = await axios.patch(`https://interview.t-alpha.com.br/api/products/update-product/${product.id}`, {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('API Response:', response); 

      if (response.status === 200 || response.status === 204) {
        onProductUpdated(); 
         setStatus("Produto Atualizado com sucesso!!")
        setTimeout(() => {
          onClose(false);
        }, 2000);
      } else {
        setError('Falha ao atualizar o produto.');
      }
    } catch (error) {
      console.error('Erro capturado:', error.message);
      setError('Erro ao atualizar o produto.');
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Atualizando Produto de ID:  {product.id}</h3>
          <br />
          <p style={{ color: 'green', fontWeight: 'bold' }}>{status}</p>

          <br />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <label>
            Nome:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Descrição:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Preço:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label>
            Estoque:
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </label>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => onClose(false)}>Cancel</button>
        </div>
      </div>
    )
  );
};

export default UpdateProductModal;
