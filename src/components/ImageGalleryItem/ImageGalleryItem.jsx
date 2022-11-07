import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
import { Component } from 'react';
import Modal from 'components/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
    showLoader: false,
  };

  openModal = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { showModal } = this.state;
    const { openModal, closeModal } = this;
    const { url, name, largeImg } = this.props;
    return (
      <GalleryItem onClick={openModal}>
        <GalleryImg src={url} alt={name} />

        {showModal && (
          <Modal onClose={closeModal} modalImg={largeImg} name={name} />
        )}
      </GalleryItem>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
};
