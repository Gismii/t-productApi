import React, {useState} from "react";
import CreateProductModal from "./models/CreateProductModal";

const BtnCreateProduct = () => {

    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };

    return (

     <div className="content">
        <button onClick={handleOpenModal}>Cadastrar Novo Produto</button>
        <CreateProductModal isOpen={isModalOpen} onClose={handleCloseModal} />
        
      </div>
    )


};

export default BtnCreateProduct;