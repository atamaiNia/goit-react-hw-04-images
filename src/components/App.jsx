import { Component } from 'react';
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

export class App extends Component {
  state = {
    query: '',
    currentPage: 1,
    images: [],
    showLoader: false,
    totalImages: null,
    showBtn: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, currentPage } = this.state;
    if (prevState.query !== query) {
      this.setState({ showLoader: true, showBtn: false });
      try {
        const response = await fetchImages(query, currentPage);
        console.log(response.totalHits);
        setTimeout(() => {
          this.setState({
            images: response.hits,
            showLoader: false,
            totalImages: response.totalHits,
          });

          if (response.hits.length === 0) {
            return ToastError('There are no picture, enter another query');
          }
          if (response.hits.length) {
            this.setState({ showBtn: true });
            return ToastSuccess(`We found ${response.totalHits} pictures`);
          }
        }, 1000);
      } catch {
        this.setState({ showLoader: false });
        return ToastError('Something wrong. Try again!!!');
      }
    }
    if (prevState.query === query && prevState.currentPage !== currentPage) {
      this.setState({ showLoader: true });

      try {
        const response = await fetchImages(query, currentPage);
        console.log('response.totalHits', response.totalHits);
        console.log('response.currentPage*12', this.state.currentPage * 12);
        setTimeout(() => {
          this.setState(prevState => ({
            showLoader: false,
            images: [...prevState.images, ...response.hits],
            totalImages: response.totalHits,
          }));

          if (this.state.currentPage * 12 >= response.totalHits) {
            this.setState({ showBtn: false });
          }
        }, 1000);
      } catch {
        this.setState({ showLoader: false });
        return ToastError('Something wrong. Try again!!!');
      }
    }
  }

  handleSearchBarSubmit = newQuery => {
    if (this.state.query === newQuery) {
      return;
    }

    this.setState({
      query: newQuery,
      currentPage: 1,
      images: [],
      showLoader: true,
    });
  };

  handleBtnClick = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  render() {
    const { images, showBtn, showLoader, totalImages } = this.state;
    const { handleSearchBarSubmit, handleBtnClick } = this;
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
}
