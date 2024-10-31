/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import ImageGalleryItem from "./../ImageGalleryItem/ImageGalleryItem";
import Button from "./../UI/Button/Button";
import Modal from "./../Modal/Modal";
import { ProgressBar } from "react-loader-spinner";
import { fetchImages } from "../../services/imagesApi";

import s from "./ImageGallery.module.css";
import NotFound from "../Not found/NotFound";

const ImageGallery = ({ imageQuery }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const itemRef = useRef(null);

  // useEffect(() => {
  //   setImages([]);
  //   setPage(1);
  // }, [imageQuery]);

  useEffect(() => {
    if (imageQuery !== "") {
      setIsLoading(true);
      setError("");

      fetchImages(imageQuery, page)
        .then((images) => {
          if (images.length === 0) {
            setError("No images found");
          } else {
            setImages((prev) => [...prev, ...images]);
          }
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [imageQuery, page]);

  useEffect(() => {
    itemRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [images]);

  const onLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const getModalImage = (largeImageURL) => {
    setLargeImage(largeImageURL);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setLargeImage("");
  };

  if (!imageQuery) {
    return null;
  }

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
        <Modal largeImage={largeImage} onCloseModal={closeModal} />
      )}
      {error ? (
        <NotFound error={error} query={imageQuery} />
      ) : (
        <ul className={s.wrapperGallery}>
          <ImageGalleryItem
            itemRef={itemRef}
            images={images}
            openModal={openModal}
            getModalImage={getModalImage}
          />
        </ul>
      )}
      {!isLoading && images.length > 0 && (
        <Button
          onClick={onLoadMore} // на пропс онКлик (кот. мы определили внутри самого компонента) передается метод смены страницы
          label="Load more..."
          type="button"
          className={s.loadMoreButton}
        />
      )}
    </div>
  );
};

export default ImageGallery;
