// підключення бібліотек
import PropTypes from 'prop-types';
import { Ul } from './ImageGallery.styled';


import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ imagesArray, setImageLink, togleModal }) => {
  return (
    <Ul>
      {imagesArray.map(image => (
        <ImageGalleryItem
          image={image}
          key={image.id}
          togleModal={togleModal}
          setImageLink={setImageLink}
        />
      ))}
    </Ul>
  );
};


ImageGallery.propTypes = {
  imagesArray: PropTypes.array.isRequired,
  togleModal: PropTypes.func.isRequired,
  setImageLink: PropTypes.func.isRequired,
};

export default ImageGallery;
