import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, StyledModal } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { modalImg, name } = this.props;
    const { handleBackdropClick } = this;

    return (
      <Overlay onClick={handleBackdropClick}>
        <StyledModal>
          <img src={modalImg} alt={name} />
        </StyledModal>
      </Overlay>
    );
  }
}

export default Modal;

Modal.propTypes = {
  modalImg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
