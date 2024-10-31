import "./App.css";
import Searchbar from "./component/Searchbar/Searchbar";
import ImageGallery from "./component/ImageGallery/ImageGallery";
import { useState } from "react";

const App = () => {
  const [query, setQuery] = useState("");

  const changeQuery = (input) => {
    if (input.trim() === "") {
      return;
    }
    setQuery(input);
  };

  return (
    <div className="">
      <Searchbar changeQuery={changeQuery} buttonType={"submit"} />
      <ImageGallery imageQuery={query} buttonType={"submit"} />
    </div>
  );
};

export default App;
