/* eslint-disable react/prop-types */

import NoImagesError from "./../../images/Klopp_Street_art.webp";
import s from "./NotFound.module.css";

export const NotFound = ({ query }) => {
  return (
    <div className={s.noImagesWrapper}>
      <h1 className={s.noImagesErrorTitle}>
        Sorry for that, <br />
        but <span className={s.noSpan}>NO</span> images for <br />
        <span className={s.noSpanYellow}>
          &quot;{query.toUpperCase()}&quot;
        </span>
        <br />
        are found
        <br />
        the same as the trophies <br />
        for &quot;Man Und&quot;
      </h1>
      <img
        className={s.noImagesError}
        src={NoImagesError}
        alt="error: no images"
      />
    </div>
  );
};
