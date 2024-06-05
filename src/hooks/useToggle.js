import { useState } from 'react';

export const useToggle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSrc, setModalSrc] = useState();
  const [modalAlt, setModalAlt] = useState();

  const openModal = event => {
    setIsModalOpen(true);
    const clickedImage = event.target;
    const modalSrc = clickedImage.getAttribute('datasrc');
    const modalAlt = clickedImage.alt;
    setModalSrc(modalSrc);
    setModalAlt(modalAlt);
  };

  const closeModal = event => {
    setIsModalOpen(false);
  };

  return {
    openModal,
    closeModal,
    isModalOpen,
    modalSrc,
    modalAlt,
    setIsModalOpen,
  };
};
