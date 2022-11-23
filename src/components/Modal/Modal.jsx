import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, StyledModal } from './Modal.styled';

export default function Modal({ name, modalImg, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleBackdropClick}>
      <StyledModal>
        <img src={modalImg} alt={name} />
      </StyledModal>
    </Overlay>
  );
}

Modal.propTypes = {
  modalImg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
