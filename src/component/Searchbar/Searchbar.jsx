import { useState } from "react";
import Button from "../UI/Button/Button.jsx";
import s from "./Searchbar.module.css";

// eslint-disable-next-line react/prop-types
const Searchbar = ({ changeQuery, buttonType }) => {
  const [inputQuery, setInputQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputQuery === "") {
      return;
    }

    changeQuery(inputQuery);
    setInputQuery("");
  };

  const handleInputChange = (e) => {
    setInputQuery(e.target.value.trim());
  };

  return (
    <header className={s.searchbarHeader}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.inputSearch}
          placeholder="tap here..."
          value={inputQuery}
          onChange={handleInputChange}
        />
        <Button className={s.buttonSearch} label="Search" type={buttonType} />
      </form>
    </header>
  );
};

export default Searchbar;
