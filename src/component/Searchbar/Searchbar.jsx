/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "../UI/Button/Button";
import s from "./Searchbar.module.css";

export const Searchbar = (changeQuery, buttonType) => {
  const [inputQuery, setInputQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = inputQuery.trim();

    if (query === "") {
      setInputQuery("");
      return;
    }

    changeQuery(query);
    setInputQuery("");
  };

  const handleInputChange = (e) => {
    setInputQuery(e.target.value);
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
        <Button
          className={s.buttonSearch}
          onClick={handleSubmit}
          label="Search"
          type={buttonType}
        />
      </form>
    </header>
  );
};
