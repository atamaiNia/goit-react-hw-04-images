import ImageGalleryItem from 'components/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export default function ImageGallery({ images, currentPage }) {
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

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
