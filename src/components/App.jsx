import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Loader from './Loader/Loader';
import Button from './Button';
import { AppWrap } from './App.styled';

export class App extends Component {
  state = {
    imagesArray: [],
    query: '',
    showModal: false,
    imageLink: '',
    page: 1,
    showBtnLoadMore: false,
    isLoading: false,
  };

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {}

  onSubmitSearchBtn = toFind => {
    this.setState({ query: toFind, imagesArray: [], page: 1 });
    this.getFromAPI(toFind, 1);
  };

  loadMorePictures = () => {
    this.getFromAPI(this.state.query, this.state.page + 1);
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async getFromAPI(toFind, page) {
    const API_KEY = '34781743-09d11a08c8aa729d147b2c9f6';
    const BASE_URL = 'https://pixabay.com/api/';

    const searchParams = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
    });

    const URL = `${BASE_URL}?key=${API_KEY}&q=${toFind}&page=${page}&${searchParams}`;

    try {
      this.setState({ isLoading: true });

      const response = await axios.get(URL);

      if (response.data.totalHits < 1) {
        toast(`За запитом "${this.state.query}" результатів нема!`);
        this.setState({ query: '', page: 1, showBtnLoadMore: false });
      } else if (response.data.hits.length !== 0) {
        this.setState(prevState => ({
          imagesArray: [...prevState.imagesArray, ...response.data.hits],
        }));
        //

        const alreadyDownloaded = 12 * this.state.page;
        if (alreadyDownloaded < response.data.totalHits) {
          if (this.state.page === 1) {
            toast(
              `За запитом "${this.state.query}" знайдено картинок: ${response.data.totalHits}. Натисни "завантажити ще", щоб отримати ще 12 картинок!`
            );
          } else {
            const moreImages = response.data.totalHits - alreadyDownloaded;
            toast(
              `За запитом "${this.state.query}" лишилося ще картинок: ${moreImages} із ${response.data.totalHits}. Натисни "завантажити ще", щоб отримати ще 12 картинок!`
            );
          }

          this.setState({ showBtnLoadMore: true });
        } else {
          toast(
            `Це всі результати за запитом "${this.state.query}". Більше результатів нема!`
          );
          this.setState({ showBtnLoadMore: false });
        }
      }

      this.setState({
        isLoading: false,
      });
    } catch (error) {
      this.setState({ error });
    }
  }

  togleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  setImageLink = link => {
    this.setState({ imageLink: link });
  };

  render() {
    return (
      <AppWrap>
        {this.state.isLoading && <Loader />}
        <ToastContainer autoClose={3000} />
        <Searchbar onSubmit={this.onSubmitSearchBtn} />
        {this.state.query && (
          <ImageGallery
            imagesArray={this.state.imagesArray}
            togleModal={this.togleModal}
            setImageLink={this.setImageLink}
          />
        )}
        {this.state.showBtnLoadMore && (
          <Button loadMorePictures={this.loadMorePictures} />
        )}
        {this.state.showModal && (
          <Modal
            imageLink={this.state.imageLink}
            togleModal={this.togleModal}
          />
        )}
      </AppWrap>
    );
  }
}
