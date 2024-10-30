/* eslint-disable react/prop-types */
import { Component, createRef } from "react";
import ImageGalleryItem from "./../ImageGalleryItem/ImageGalleryItem";
import Button from "./../UI/Button/Button";
import Modal from "./../Modal/Modal";
import { ProgressBar } from "react-loader-spinner";
import { fetchImages } from "../../services/imagesApi";

import s from "./ImageGallery.module.css";
import NotFound from "../Not found/NotFound";

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    largeImage: "",
    isOpenModal: false,
    isLoading: false,
    error: "",
  };

  itemRef = createRef(null);

  static getDerivedStateFromProps(currentProps, prevState) {
    if (prevState.query !== currentProps.query) {
      return { query: currentProps.query, page: 1 };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { imageQuery } = this.props;
    const { page, images } = this.state;
    //* записал изначально в строку 18 и сидел час ебался

    if (prevProps.imageQuery !== imageQuery && imageQuery !== "") {
      this.setState({ images: [], page: 1 }, () => {
        this.getImages(imageQuery);
      });
    }
    if (prevState.page !== page) {
      this.getImages(imageQuery);
    }
    if (prevState.images !== images) {
      this.itemRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  getImages(query) {
    const { page } = this.state;

    this.setState({ isLoading: true, error: "", query });

    fetchImages(query, page)
      .then((images) => {
        if (images.length === 0) {
          this.setState({ error: "No images found" });
          // console.log("No images found");
        } else {
          this.setState((prev) => ({ images: [...prev.images, ...images] }));
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        //! throw new Error(error); // запутался...в чем разницы ?)
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  onLoadMore = () => {
    this.setState((prev) => ({
      page: prev.page + 1,
    }));
  };

  openModal = () => {
    this.setState({ isOpenModal: true });
  };

  getModalImage = (largeImageURL) => {
    this.setState({ largeImage: largeImageURL });
  };

  closeModal = () => {
    this.setState({ isOpenModal: false, largeImage: "" });
  };

  render() {
    // console.log(this.props.imageQuery); //напоминалка как правильно в классе вызывать консоль
    const { isLoading, images, isOpenModal, largeImage, error } = this.state;
    const { imageQuery } = this.props;
    return (
      <div className={s.container}>
        {isLoading && (
          <ProgressBar
            visible={true}
            height="80"
            width="150"
            ariaLabel="progress-bar-loading"
            barColor="#dae962"
            borderColor="#125a1f"
            className={s.loader}
            wrapperClass={s.customProgressBar}
          />
        )}
        {isOpenModal && (
          <Modal largeImage={largeImage} onCloseModal={this.closeModal} />
        )}
        {error ? (
          <NotFound error={error} query={imageQuery} />
        ) : (
          <ul className={s.wrapperGallery}>
            <ImageGalleryItem
              itemRef={this.itemRef}
              images={this.state.images}
              openModal={this.openModal}
              getModalImage={this.getModalImage}
            />
          </ul>
        )}
        {!isLoading && images.length > 0 && (
          <Button
            onClick={this.onLoadMore} // на пропс онКлик (кот. мы определили внутри самого компонента) передается метод смены страницы
            label="Load more..."
            type="button"
            className={s.loadMoreButton}
          />
        )}
      </div>
    );
  }
}
