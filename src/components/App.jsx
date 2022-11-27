import { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Button from './Button';
import { Container } from './App.styled';
import { fetchImages } from './API';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
import { ToastError } from './Notification/ToastError';
import { ToastSuccess } from './Notification/ToastSuccess';
import * as Scroll from 'react-scroll';

export default function App() {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [totalImages, setTotalImages] = useState(null);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }
    (async () => {
      setShowLoader(true);
      setShowBtn(false);

      try {
        const response = await fetchImages(query, currentPage);
        console.log(response.totalHits);

        setTimeout(() => {
          if (currentPage === 1) {
            setShowLoader(false);
            setImages(response.hits);
            setTotalImages(response.totalHits);
          } else {
            setShowLoader(false);
            setImages(prevTotalImages => [
              ...prevTotalImages,
              ...response.hits,
            ]);
            setTotalImages(response.totalHits);
            if (currentPage * 12 >= response.totalHits) {
              setShowBtn(false);
              return ToastError('End of collection');
            }
          }

          if (response.hits.length === 0) {
            return ToastError('There are no picture, enter another query');
          }
          if (response.hits.length) {
            setShowBtn(true);
            return ToastSuccess(`We found ${response.totalHits} pictures`);
          }
        }, 1000);
      } catch {
        setShowLoader(false);
        return ToastError('Something wrong. Try again!!!');
      }
    })();
  }, [query, currentPage]);

  const handleSearchBarSubmit = newQuery => {
    if (query === newQuery) {
      return;
    }

    setQuery(newQuery);
    setCurrentPage(1);
    setImages([]);
    setShowLoader(true);
  };

  const handleBtnClick = () => {
    setCurrentPage(prevCurrentPage => prevCurrentPage + 1);
    const scroll = Scroll.animateScroll;
    scroll.scrollMore(590, { duration: 2500 });
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSearchBarSubmit} />
      {showLoader && <Loader />}

      {totalImages > 0 && <ImageGallery images={images} />}

      {showBtn && totalImages > 12 && <Button onClick={handleBtnClick} />}

      <ToastContainer />
    </Container>
  );
}
