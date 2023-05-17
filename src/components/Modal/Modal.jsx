import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Overlay, ModalContainer, Img } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    // console.log('монтуємо модалку');
    window.addEventListener('keydown', this.hanleKeyDown);
  }

  componentWillUnmount() {
    // console.log('розмонтовуємо модалку');
    window.removeEventListener('keydown', this.hanleKeyDown);
  }

  hanleKeyDown = event => {
    const { togleModal } = this.props;
    if (event.code === 'Escape') {
    }
    togleModal();
  };

  handleOverlayClick = event => {
    const { togleModal } = this.props;
    const { currentTarget, target } = event;
    if (currentTarget === target) {
      togleModal();
    }
  };

  render() {
    const { imageLink } = this.props;
    return createPortal(
      <div>
        <Overlay onClick={this.handleOverlayClick}>
          <ModalContainer>
            <Img src={imageLink} alt="" />
          </ModalContainer>
        </Overlay>
      </div>,
      modalRoot
    );
  }
}

// перевірка PropTypes
Modal.propTypes = {
  imageLink: PropTypes.string.isRequired,
  togleModal: PropTypes.func.isRequired,
};
