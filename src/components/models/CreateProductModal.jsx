import React, { useState } from 'react';
import axios from 'axios';
import '../models/createProductModal.css'; 

const CreateProductModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleCreateProduct = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token não encontrado!');
        return;
      }

      const options = {
        method: 'POST',
        url: 'https://interview.t-alpha.com.br/api/products/create-product',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          name,
          description,
          price: parseFloat(price),
          stock: parseInt(stock, 10),
        },
      };

      const response = await axios.request(options);

      if (response.status === 201) {
        setSuccess('Produto criado com sucesso!');
        setError('');
        setName('');
        setDescription('');
        setPrice('');
        setStock('');

        setTimeout (() => {

          setSuccess(' ');

        }, 6000);
        
      } else {
        setError('Falha ao criar o produto.');
      }
    } catch (error) {
      setError('Erro ao criar o produto.');
      console.error('Error creating product:', error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Cadastrar Produto</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <div>
          <label>
            Nome:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Descrição:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Preço:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Estoque:
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </label>
        </div>
        <button onClick={handleCreateProduct}>Criar Produto</button>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default CreateProductModal;
