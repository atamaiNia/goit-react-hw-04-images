import { Component } from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export default class ImageGallery extends Component {
  componentDidUpdate(prevProps, _) {
    if (prevProps !== this.props) {
      window.scrollBy({
        top: 360 * 2,
        behavior: 'smooth',
      });
    }
  }

  render() {
    const { images } = this.props;
    return (
      <GalleryList className="gallery">
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            url={webformatURL}
            largeImg={largeImageURL}
            name={tags}
          />
        ))}
      </GalleryList>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
