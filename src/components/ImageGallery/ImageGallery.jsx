import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ children }) => {
  return <ul className={css.imageGallery}>{children}</ul>;
};

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
};
