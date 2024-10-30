/* eslint-disable react/prop-types */
import s from "./ImageGalleryItem.module.css";

export const ImageGalleryItem = ({
  itemRef,
  images,
  getModalImage,
  openModal,
}) => {
  const handleClick = (largeImage) => {
    openModal();
    getModalImage(largeImage);
  };

  return (
    <>
      {images.map(({ id, webformatURL, largeImageURL }, idx, arr) => (
        <li
          className={s.item}
          key={id}
          ref={arr.length - 12 === idx ? itemRef : null}
          onClick={() => handleClick(largeImageURL)}
        >
          <img className={s.itemImgage} key={id} src={webformatURL} alt="" />
        </li>
      ))}
    </>
  );
};
