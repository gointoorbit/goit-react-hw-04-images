import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ openModal, modalSrc, modalAlt, closeModal }) => {
  return (
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}>
        <img src={modalSrc} alt={modalAlt} onClick={openModal} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  openModal: PropTypes.func.isRequired,
  modalSrc: PropTypes.string.isRequired,
  modalAlt: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
