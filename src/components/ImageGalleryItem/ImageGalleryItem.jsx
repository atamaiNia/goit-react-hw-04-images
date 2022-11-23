import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from 'components/Modal';

export default function ImageGalleryItem({ url, name, largeImg }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <GalleryItem onClick={openModal}>
      <GalleryImg src={url} alt={name} />

      {showModal && (
        <Modal onClose={closeModal} modalImg={largeImg} name={name} />
      )}
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
};
