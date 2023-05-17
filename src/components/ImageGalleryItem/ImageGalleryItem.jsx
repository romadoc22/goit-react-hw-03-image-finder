import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Li, Thumb, Img } from './ImageGalleryItem.styled';


export default class ImageGalleryItem extends Component {
  
  onClickShowPhoto = () => {
    const { setImageLink, togleModal, image } = this.props;
    setImageLink(image.largeImageURL);
    togleModal();
  };

  render() {
    const { image } = this.props;
    return (
      <Li>
        <Thumb onClick={this.onClickShowPhoto}>
          <Img src={image.webformatURL} alt={image.tags} loading="lazy" />
        </Thumb>
      </Li>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  setImageLink: PropTypes.func.isRequired,
  togleModal: PropTypes.func.isRequired,
};
