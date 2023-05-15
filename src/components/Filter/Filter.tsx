import React, { useState, ChangeEvent } from "react";
import classes from "./Filter.module.css";

interface Props {
  onOptionChange: (selectedOption: string) => void;
}

const Filter = ({ onOptionChange }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const optionValue = event.target.value;
    setSelectedOption(optionValue);
    onOptionChange(optionValue);
  };

  return (
    <div className={classes.inputContainer}>
      <label htmlFor="options">Sort by:</label>
      <select
        id="options"
        name="options"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="popularity.desc">Popularity</option>
        <option value="release_date.desc">Release date</option>
        <option value="vote_average.desc">Vote</option>
      </select>
    </div>
  );
};

export default Filter;
