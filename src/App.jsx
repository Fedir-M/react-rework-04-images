import "./App.css";
import Searchbar from "./component/Searchbar/Searchbar";
import ImageGallery from "./component/ImageGallery/ImageGallery";
import { useState } from "react";

export const App = () => {
  const [query, setQuery] = useState("");
  const buttonType = "submit";

  const changeQuery = (input) => {
    setQuery(input);
  };

  return (
    <div className="">
      <Searchbar changeQuery={changeQuery} buttonType={buttonType} />

      <ImageGallery imageQuery={query} buttonType={buttonType} />
    </div>
  );
};
// gitplease
