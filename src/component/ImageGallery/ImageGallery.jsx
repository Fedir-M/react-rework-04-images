/* eslint-disable react/prop-types */
import { useCallback, useEffect, useRef, useState } from "react";
import ImageGalleryItem from "./../ImageGalleryItem/ImageGalleryItem";
import Button from "./../UI/Button/Button";
import Modal from "./../Modal/Modal";
import { ProgressBar } from "react-loader-spinner";
import { fetchImages } from "../../services/imagesApi";

import s from "./ImageGallery.module.css";
import NotFound from "../Not found/NotFound";

export const ImageGallery = ({ imageQuery }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const itemRef = useRef(null);

  useEffect(() => {
    if (imageQuery) {
      setImages([]);
      setPage(1);
      getImages(imageQuery);
    }
  }, [imageQuery, getImages]);

  useEffect(() => {
    if (page > 1) {
      getImages(imageQuery);
    }
  }, [page, imageQuery, getImages]);

  useEffect(() => {
    if (images.length > 12) {
      itemRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [images]);

  const getImages = useCallback(
    (query) => {
      setIsLoading(true);
      setError("");

      fetchImages(query, page)
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
    },
    [page]
  );

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
