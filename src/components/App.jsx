import { useState, useEffect, useRef } from 'react';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { Loader } from './Loader/Loader.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem.jsx';
import { Button } from './Button/Button.jsx';
import { Modal } from './Modal/Modal.jsx';
import { useToggle } from '../hooks/useToggle.js';

export const App = () => {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [modalSrc, setModalSrc] = useState();
  // const [modalAlt, setModalAlt] = useState();

  const {
    openModal,
    closeModal,
    isModalOpen,
    modalSrc,
    modalAlt,
    setIsModalOpen,
  } = useToggle();

  const timerRef = useRef(null);

  const onChange = event => {
    setFilter(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    setImages([]);

    setIsButtonClicked(true);
    setCurrentPage(1);
  };

  const loadMore = event => {
    event.preventDefault();

    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
    setIsButtonClicked(true);
  };

  const fetchImages = async () => {
    const query = `https://pixabay.com/api/?q=${filter}&page=${currentPage}&key=40029765-d3979f765e8685f4729db0a6b&image_type=photo&orientation=horizontal&per_page=12`;

    try {
      const response = await fetch(query);
      const preparedResponse = await response.json();
      const fetchedImages = preparedResponse.hits;
      if (fetchedImages.length > 0) {
        setImages(prev => [...prev, ...fetchedImages]);
        setIsLoading(false);
        setIsButtonClicked(false);
      } else {
        setIsLoading(false);
        setIsButtonClicked(false);
        alert('There is no matched photos in database');
        return;
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (filter && isButtonClicked) {
      setIsLoading(true);
      const currentTimer = setTimeout(() => {
        fetchImages();
      }, 300);
      timerRef.current = currentTimer;
    }

    return () => {
      clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isButtonClicked]);

  // const openModal = event => {
  //   setIsModalOpen(true);

  //   const clickedImage = event.target;
  //   const modalSrc = clickedImage.getAttribute('datasrc');
  //   const modalAlt = clickedImage.alt;
  //   setModalSrc(modalSrc);
  //   setModalAlt(modalAlt);
  // };

  // const closeModal = event => {
  //   setIsModalOpen(false);
  // };

  useEffect(() => {
    const pressEscape = event => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    document.addEventListener('keydown', pressEscape);
    return () => {
      document.removeEventListener('keydown', pressEscape);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen]);

  return (
    <>
      <Searchbar onSubmit={onSubmit} onChange={onChange} />
      {error && <p>Something went wrong: {error.message}</p>}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem image={image} openModal={openModal} />
          ))}
        </ImageGallery>
      )}
      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          modalSrc={modalSrc}
          modalAlt={modalAlt}
        />
      )}
      {images.length > 0 && !isLoading && <Button loadMore={loadMore} />}
    </>
  );
};
